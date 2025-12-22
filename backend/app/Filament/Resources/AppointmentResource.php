<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AppointmentResource\Pages;
use App\Models\Appointment;
use App\Models\Doctor;
use Filament\Forms;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;

class AppointmentResource extends Resource
{
    protected static ?string $model = Appointment::class;
    protected static ?string $navigationLabel = 'Appointments';
    protected static ?int $navigationSort = 2;

    public static function getNavigationGroup(): string | \UnitEnum | null
    {
        return 'Main';
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Forms\Components\Select::make('patient_id')
                ->relationship('patient', 'name')
                ->label('Patient')
                ->searchable()
                ->preload()
                ->required()
                ->reactive()
                ->afterStateUpdated(function ($state, Set $set) {
                    if ($state) {
                        $patient = \App\Models\Patient::find($state);
                        $set('patient_phone', $patient?->phone);
                        $set('patient_email', $patient?->email);
                    } else {
                        $set('patient_phone', null);
                        $set('patient_email', null);
                    }
                })
                ->createOptionForm([
                    Forms\Components\TextInput::make('name')->required()->maxLength(255),
                    Forms\Components\TextInput::make('email')->email()->maxLength(255),
                    Forms\Components\TextInput::make('phone')->maxLength(50),
                    Forms\Components\DatePicker::make('dob')->label('Date of Birth'),
                    Forms\Components\Select::make('gender')->options([
                        'male' => 'Male',
                        'female' => 'Female',
                        'other' => 'Other',
                    ])->native(false),
                    Forms\Components\TextInput::make('address')->maxLength(255),
                    Forms\Components\TextInput::make('emergency_contact')->label('Emergency contact')->maxLength(255),
                ]),
            Forms\Components\TextInput::make('patient_phone')
                ->label('Contact')
                ->formatStateUsing(function ($state, Get $get) {
                    if ($state) return $state;
                    $patientId = $get('patient_id');
                    if ($patientId) {
                        return \App\Models\Patient::find($patientId)?->phone;
                    }
                    return null;
                }),
            Forms\Components\TextInput::make('patient_email')
                ->label('Email')
                ->disabled()
                ->dehydrated(false)
                ->formatStateUsing(function ($state, Get $get) {
                    if ($state) return $state;
                    $patientId = $get('patient_id');
                    if ($patientId) {
                        return \App\Models\Patient::find($patientId)?->email;
                    }
                    return null;
                }),
            Forms\Components\Select::make('doctor_id')
                ->relationship('doctor', 'name')
                ->reactive()
                ->afterStateUpdated(fn ($set) => $set('availability_slot', null))
                ->required(),
            
            Forms\Components\DateTimePicker::make('created_at')
                ->label('Booking Date')
                ->disabled()
                ->dehydrated(false),

            Group::make([
                Forms\Components\DatePicker::make('availability_date')
                    ->label('Check Date')
                    ->default(now())
                    ->reactive()
                    ->dehydrated(false)
                    ->afterStateUpdated(fn ($set) => $set('availability_slot', null)),
                    
                Forms\Components\Select::make('availability_slot')
                    ->label('Available Slot')
                    ->options(function (Get $get) {
                        $doctorId = $get('doctor_id');
                        $date = $get('availability_date');
                        
                        if (!$doctorId || !$date) {
                            return [];
                        }
                        
                        $doctor = Doctor::find($doctorId);
                        if (!$doctor || empty($doctor->availability)) {
                            return [];
                        }
                        
                        $dayName = \Carbon\Carbon::parse($date)->format('l');
                        $availability = $doctor->availability;
                        
                        // Handle [{"day": "Friday", "start": "07:00", "end": "18:00"}] format
                        $schedule = collect($availability)->first(function($item) use ($dayName) {
                            return is_array($item) && isset($item['day']) && strcasecmp($item['day'], $dayName) === 0;
                        });
                        
                        if ($schedule) {
                             $start = $schedule['start'] ?? null;
                             $end = $schedule['end'] ?? null;
                             if ($start && $end) {
                                 $slots = [];
                                 $current = \Carbon\Carbon::parse($start);
                                 $endTime = \Carbon\Carbon::parse($end);
                                 
                                 while ($current < $endTime) {
                                     $timeStr = $current->format('H:i');
                                     $displayTime = $current->format('h:i A');
                                     $slots[$timeStr] = $displayTime;
                                     $current->addMinutes(30);
                                 }
                                 return $slots;
                             }
                        }
                        
                        return [];
                    })
                    ->reactive()
                    ->dehydrated(false)
                    ->afterStateUpdated(function ($state, Get $get, Set $set) {
                        if ($state && $get('availability_date')) {
                            $set('scheduled_at', $get('availability_date') . ' ' . $state);
                        }
                    })
                    ->disabled(fn (Get $get) => !$get('availability_date') || !$get('doctor_id')),
            ])->columns(2)->columnSpanFull(),

            Forms\Components\DateTimePicker::make('scheduled_at')->required(),
            Forms\Components\TextInput::make('appointment_type')->label('Appointment Type'),
            Forms\Components\TextInput::make('phone')->label('Phone Number'),
            Forms\Components\Select::make('status')
                ->options([
                    'pending' => 'Pending',
                    'confirmed' => 'Confirmed',
                    'cancelled' => 'Cancelled',
                    'completed' => 'Completed',
                ])->required(),
            Forms\Components\Textarea::make('notes'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('id')->sortable(),
            Tables\Columns\TextColumn::make('patient.name')->label('Patient')->searchable()->sortable(),
            Tables\Columns\TextColumn::make('patient.phone')->label('Patient Contact')->searchable(),
            Tables\Columns\TextColumn::make('phone')->label('Appointment Phone')->searchable(),
            Tables\Columns\TextColumn::make('doctor.name')->label('Doctor')->searchable()->sortable(),
            Tables\Columns\TextColumn::make('created_at')->label('Booking Date')->dateTime()->sortable(),
            Tables\Columns\TextColumn::make('scheduled_at')
                ->label('Day')
                ->formatStateUsing(fn ($state) => $state ? \Carbon\Carbon::parse($state)->format('l') : null)
                ->sortable(),
            Tables\Columns\TextColumn::make('scheduled_at')->dateTime()->sortable(),
            Tables\Columns\TextColumn::make('appointment_type')->label('Type'),
            Tables\Columns\TextColumn::make('payment_status')
                ->badge()
                ->color(fn (string $state): string => match ($state) {
                    'paid' => 'success',
                    'failed' => 'danger',
                    default => 'warning',
                }),
            Tables\Columns\TextColumn::make('payment_amount')->money('NPR'),
            Tables\Columns\TextColumn::make('status')->badge(),
        ])->defaultSort('created_at', 'desc')
        ->filters([
            Tables\Filters\SelectFilter::make('status')
                ->options([
                    'pending' => 'Pending',
                    'confirmed' => 'Confirmed',
                    'cancelled' => 'Cancelled',
                    'completed' => 'Completed',
                ]),
            Tables\Filters\SelectFilter::make('appointment_type')
                ->options([
                    'Online' => 'Online',
                    'In-Clinic' => 'In-Clinic',
                    'Home Visit' => 'Home Visit',
                ]),
            Tables\Filters\SelectFilter::make('doctor_id')
                ->label('Doctor')
                ->relationship('doctor', 'name'),
            Tables\Filters\SelectFilter::make('payment_status')
                ->options([
                    'pending' => 'Pending',
                    'paid' => 'Paid',
                    'failed' => 'Failed',
                ]),
            Tables\Filters\Filter::make('scheduled_at')
                ->form([
                    Forms\Components\DatePicker::make('from')->label('From'),
                    Forms\Components\DatePicker::make('until')->label('Until'),
                ])
                ->query(function (\Illuminate\Database\Eloquent\Builder $query, array $data): \Illuminate\Database\Eloquent\Builder {
                    return $query
                        ->when($data['from'] ?? null, fn ($q, $date) => $q->whereDate('scheduled_at', '>=', $date))
                        ->when($data['until'] ?? null, fn ($q, $date) => $q->whereDate('scheduled_at', '<=', $date));
                }),
        ])->actions([
            EditAction::make(),
            DeleteAction::make(),
        ])->bulkActions([
            DeleteBulkAction::make(),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAppointments::route('/'),
            'create' => Pages\CreateAppointment::route('/create'),
            'edit' => Pages\EditAppointment::route('/{record}/edit'),
        ];
    }
}
