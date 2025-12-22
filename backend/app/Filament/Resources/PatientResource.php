<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PatientResource\Pages;
use App\Models\Patient;
use App\Models\Doctor;
use App\Models\LabTest;
use Filament\Forms;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Actions\Action;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Actions;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;

class PatientResource extends Resource
{
    protected static ?string $model = Patient::class;
    protected static ?string $navigationLabel = 'Patients';
    protected static ?string $recordTitleAttribute = 'name';
    protected static ?int $navigationSort = 3;

    public static function getNavigationGroup(): string | \UnitEnum | null
    {
        return 'Main';
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Tabs::make('Tabs')
                ->persistTabInQueryString('tab')
                ->tabs([
                    Tab::make('Overview')
                        ->hidden(fn ($livewire) => $livewire instanceof Pages\CreatePatient)
                        ->schema([
                            Forms\Components\Textarea::make('notes')->columnSpanFull(),
                            Forms\Components\Placeholder::make('total_appointments')
                                ->label('Total appointments')
                                ->content(fn ($record) => $record ? \App\Models\Appointment::where('patient_id', $record->id)->count() : 0),
                            Forms\Components\Placeholder::make('upcoming_appointments')
                                ->label('Upcoming appointments')
                                ->content(fn ($record) => $record ? \App\Models\Appointment::where('patient_id', $record->id)->where('scheduled_at', '>=', now())->count() : 0),
                            Forms\Components\Placeholder::make('last_visit')
                                ->label('Last visit')
                                ->content(fn ($record) => $record ? optional(\App\Models\Appointment::where('patient_id', $record->id)->orderByDesc('scheduled_at')->first())->scheduled_at : null),
                        ])->columns(2),

                    Tab::make('Appointments')
                        ->hidden(fn ($livewire) => $livewire instanceof Pages\CreatePatient)
                        ->schema([
                            Section::make('Appointments List')
                                ->headerActions([
                                    Action::make('create_appointment')
                                        ->label('Add Appointment')
                                        ->icon('heroicon-m-plus')
                                        ->color('primary')
                                        ->button()
                                        ->modalHeading('Create Appointment')
                                        ->modalSubmitActionLabel('Create')
                                        ->form([
                                            Forms\Components\Select::make('doctor_id')
                                                ->label('Doctor')
                                                ->options(Doctor::all()->pluck('name', 'id'))
                                                ->searchable()
                                                ->reactive()
                                                ->afterStateUpdated(fn ($set) => $set('availability_slot', null))
                                                ->required(),
                                            
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

                                            Forms\Components\DateTimePicker::make('scheduled_at')
                                                ->required(),
                                            Forms\Components\Select::make('status')
                                                ->options([
                                                    'pending' => 'Pending',
                                                    'confirmed' => 'Confirmed',
                                                    'cancelled' => 'Cancelled',
                                                    'completed' => 'Completed',
                                                ])
                                                ->default('pending')
                                                ->required(),
                                            Forms\Components\Textarea::make('notes')
                                                ->columnSpanFull(),
                                        ])
                                        ->action(function (array $data, Patient $record) {
                                            $record->appointments()->create($data);
                                            
                                            \Filament\Notifications\Notification::make()
                                                ->title('Appointment created')
                                                ->success()
                                                ->send();
                            
                                            redirect(request()->header('Referer'));
                                        }),
                                ])
                                ->schema([
                                    Forms\Components\Placeholder::make('appointments_list_view')
                                        ->hiddenLabel()
                                        ->hidden(fn ($record) => $record === null)
                                        ->content(fn ($record) => view('filament.forms.components.patient-appointments-list', [
                                            'appointments' => $record->appointments()->with('doctor')->orderBy('scheduled_at', 'desc')->get()
                                        ]))
                                        ->columnSpanFull(),
                                ]),

                            Forms\Components\Repeater::make('appointments')
                                ->label('Manage Appointments')
                                ->relationship()
                                ->schema([
                                    Forms\Components\Select::make('doctor_id')
                                        ->label('Doctor')
                                        ->options(Doctor::all()->pluck('name', 'id'))
                                        ->searchable()
                                        ->reactive()
                                        ->afterStateUpdated(fn ($set) => $set('availability_slot', null))
                                        ->required(),
                                    
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

                                    Forms\Components\DateTimePicker::make('scheduled_at')
                                        ->required(),
                                    Forms\Components\Select::make('status')
                                        ->options([
                                            'pending' => 'Pending',
                                            'confirmed' => 'Confirmed',
                                            'cancelled' => 'Cancelled',
                                            'completed' => 'Completed',
                                        ])
                                        ->default('pending')
                                        ->required(),
                                    Forms\Components\Textarea::make('notes')
                                        ->columnSpanFull(),
                                ])
                                ->columns(2)
                                ->itemLabel(fn (array $state): ?string => $state['scheduled_at'] ?? null)
                                ->collapsed(),
                        ]),

                    Tab::make('Prescriptions')
                        ->hidden(fn ($livewire) => $livewire instanceof Pages\CreatePatient)
                        ->schema([
                            Forms\Components\Repeater::make('prescriptions')
                                ->relationship()
                                ->schema([
                                    Forms\Components\Select::make('doctor_id')
                                        ->label('Doctor')
                                        ->options(Doctor::all()->pluck('name', 'id'))
                                        ->searchable(),
                                    Forms\Components\DatePicker::make('prescribed_at')
                                        ->default(now())
                                        ->required(),
                                    Forms\Components\FileUpload::make('file_path')
                                        ->label('Prescription File')
                                        ->disk('public')
                                        ->directory('prescriptions')
                                        ->openable()
                                        ->downloadable()
                                        ->columnSpanFull(),
                                    Forms\Components\Textarea::make('notes')
                                        ->columnSpanFull(),
                                ])
                                ->columns(2)
                                ->collapsible()
                                ->itemLabel(fn (array $state): ?string => $state['prescribed_at'] ?? null),
                        ]),

                    Tab::make('Lab Appointments')
                        ->hidden(fn ($livewire) => $livewire instanceof Pages\CreatePatient)
                        ->schema([
                            Forms\Components\Repeater::make('labAppointments')
                                ->relationship()
                                ->schema([
                                    Forms\Components\Select::make('lab_test_id')
                                        ->label('Lab Test')
                                        ->options(LabTest::all()->pluck('name', 'id'))
                                        ->searchable(),
                                    Forms\Components\TextInput::make('test_name')
                                        ->label('Custom Test Name')
                                        ->placeholder('If not in catalog'),
                                    Forms\Components\DateTimePicker::make('scheduled_at')
                                        ->required(),
                                    Forms\Components\Select::make('status')
                                        ->options([
                                            'pending' => 'Pending',
                                            'confirmed' => 'Confirmed',
                                            'completed' => 'Completed',
                                            'cancelled' => 'Cancelled',
                                        ])
                                        ->default('pending')
                                        ->required(),
                                    Forms\Components\Toggle::make('home_collection')
                                        ->reactive(),
                                    Forms\Components\TextInput::make('address')
                                        ->hidden(fn ($get) => !$get('home_collection')),
                                    Forms\Components\FileUpload::make('report_file')
                                        ->directory('lab-reports')
                                        ->downloadable()
                                        ->openable(),
                                    Forms\Components\Textarea::make('notes')
                                        ->columnSpanFull(),
                                ])
                                ->columns(2)
                                ->collapsible()
                                ->itemLabel(fn (array $state): ?string => $state['scheduled_at'] ?? null),
                        ]),

                    Tab::make('NEMT')
                        ->hidden(fn ($livewire) => $livewire instanceof Pages\CreatePatient)
                        ->schema([
                            Forms\Components\Repeater::make('nemtRequests')
                                ->relationship()
                                ->schema([
                                    Forms\Components\TextInput::make('pickup_address')->required(),
                                    Forms\Components\TextInput::make('dropoff_address')->required(),
                                    Forms\Components\DateTimePicker::make('scheduled_at')->required(),
                                    Forms\Components\Select::make('status')
                                        ->options([
                                            'pending' => 'Pending',
                                            'confirmed' => 'Confirmed',
                                            'completed' => 'Completed',
                                            'cancelled' => 'Cancelled',
                                        ])
                                        ->default('pending')
                                        ->required(),
                                    Forms\Components\TextInput::make('driver_name'),
                                    Forms\Components\TextInput::make('vehicle_type'),
                                    Forms\Components\Textarea::make('notes')->columnSpanFull(),
                                ])
                                ->columns(2)
                                ->collapsible()
                                ->itemLabel(fn (array $state): ?string => $state['scheduled_at'] ?? null),
                        ]),

                    Tab::make('Memberships')
                        ->hidden(fn ($livewire) => $livewire instanceof Pages\CreatePatient)
                        ->schema([
                            Forms\Components\Repeater::make('memberships')
                                ->relationship()
                                ->schema([
                                    Forms\Components\TextInput::make('name')->required(),
                                    Forms\Components\TextInput::make('email')->email()->required(),
                                    Forms\Components\Select::make('plan_type')
                                        ->options([
                                            'basic' => 'Basic',
                                            'premium' => 'Premium',
                                            'gold' => 'Gold',
                                        ])
                                        ->required(),
                                    Forms\Components\DatePicker::make('start_date')->default(now()),
                                    Forms\Components\DatePicker::make('end_date'),
                                    Forms\Components\Select::make('status')
                                        ->options([
                                            'active' => 'Active',
                                            'inactive' => 'Inactive',
                                            'expired' => 'Expired',
                                        ])
                                        ->default('active')
                                        ->required(),
                                    Forms\Components\Textarea::make('notes')->columnSpanFull(),
                                ])
                                ->columns(2)
                                ->collapsible()
                                ->itemLabel(fn (array $state): ?string => $state['plan_type'] ?? null),
                        ]),

                    Tab::make('Packages')
                        ->hidden(fn ($livewire) => $livewire instanceof Pages\CreatePatient)
                        ->schema([
                            Forms\Components\Repeater::make('packageRequests')
                                ->relationship()
                                ->addActionLabel('Request New Package')
                                ->schema([
                                    Forms\Components\Select::make('package_name')
                                        ->label('Select Package')
                                        ->options([
                                            'Basic Wellness' => 'Basic Wellness',
                                            'Comprehensive Care' => 'Comprehensive Care',
                                            'Senior Citizen' => 'Senior Citizen',
                                        ])
                                        ->required(),
                                    Forms\Components\TextInput::make('request_id')
                                        ->default(fn () => '#PKG-' . strtoupper(uniqid()))
                                        ->disabled()
                                        ->dehydrated(),
                                    Forms\Components\TextInput::make('patient_name')
                                        ->label('Name on Request')
                                        ->default(fn ($livewire) => $livewire->record->name ?? null),
                                    Forms\Components\TextInput::make('email')
                                        ->email()
                                        ->default(fn ($livewire) => $livewire->record->email ?? null),
                                    Forms\Components\TextInput::make('phone')
                                        ->default(fn ($livewire) => $livewire->record->phone ?? null),
                                    Forms\Components\DatePicker::make('requested_date')
                                        ->default(now())
                                        ->required(),
                                    Forms\Components\Select::make('status')
                                        ->options([
                                            'pending' => 'Pending',
                                            'approved' => 'Approved',
                                            'rejected' => 'Rejected',
                                        ])
                                        ->default('pending'),
                                ])
                                ->columns(2)
                                ->collapsible()
                                ->itemLabel(fn (array $state): ?string => $state['package_name'] ?? null),
                        ]),

                    Tab::make('Documents')
                        ->hidden(fn ($livewire) => $livewire instanceof Pages\CreatePatient)
                        ->schema([
                            Forms\Components\FileUpload::make('documents')
                                ->label('Medical Documents')
                                ->multiple()
                                ->preserveFilenames()
                                ->downloadable()
                                ->openable()
                                ->columnSpanFull(),
                        ]),

                    Tab::make('Profile')
                        ->label('Patient Register')
                        ->schema([
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
                        ])->columns(2),

                    Tab::make('Medical')
                        ->hidden(fn ($livewire) => $livewire instanceof Pages\CreatePatient)
                        ->schema([
                            Forms\Components\TagsInput::make('allergies')->label('Allergies')->placeholder('Add allergy'),
                            Forms\Components\TagsInput::make('medications')->label('Current Medications')->placeholder('Add medication'),
                            Forms\Components\TagsInput::make('conditions')->label('Conditions')->placeholder('Add condition'),
                            Forms\Components\Select::make('blood_type')->options([
                                'A+' => 'A+', 'A-' => 'A-', 'B+' => 'B+', 'B-' => 'B-', 'AB+' => 'AB+', 'AB-' => 'AB-', 'O+' => 'O+', 'O-' => 'O-',
                            ]),
                            Forms\Components\TextInput::make('insurance_provider')->label('Insurance provider')->maxLength(255),
                            Forms\Components\TextInput::make('insurance_number')->label('Insurance number')->maxLength(255),
                        ])->columns(2),
                ])->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('id')->sortable(),
            Tables\Columns\TextColumn::make('name')->searchable()->sortable(),
            Tables\Columns\TextColumn::make('email')->searchable(),
            Tables\Columns\TextColumn::make('phone')->searchable(),
            Tables\Columns\TextColumn::make('dob')->date()->label('DOB'),
            Tables\Columns\TextColumn::make('created_at')->dateTime()->toggleable(isToggledHiddenByDefault: true),
        ])->filters([
        ])->actions([
            Action::make('profile')
                ->label('Profile')
                ->icon('heroicon-o-user')
                ->url(fn (Patient $record): string => PatientResource::getUrl('edit', ['record' => $record]) . '?tab=Profile'),
            Action::make('medical')
                ->label('Medical')
                ->icon('heroicon-o-heart')
                ->color('danger')
                ->url(fn (Patient $record): string => PatientResource::getUrl('edit', ['record' => $record]) . '?tab=Medical'),
            Action::make('appointments')
                ->label('Appts')
                ->icon('heroicon-o-calendar')
                ->color('info')
                ->url(fn (Patient $record): string => PatientResource::getUrl('edit', ['record' => $record]) . '?tab=Appointments'),
            Action::make('documents')
                ->label('Docs')
                ->icon('heroicon-o-document-text')
                ->color('success')
                ->url(fn (Patient $record): string => PatientResource::getUrl('edit', ['record' => $record]) . '?tab=Documents'),
            EditAction::make()->iconButton(),
            DeleteAction::make()->iconButton(),
        ])->bulkActions([
            DeleteBulkAction::make(),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPatients::route('/'),
            'create' => Pages\CreatePatient::route('/create'),
            'edit' => Pages\EditPatient::route('/{record}/edit'),
        ];
    }

    public static function getRelations(): array
    {
        return [
            // Relations are now managed via form tabs
            // PatientResource\RelationManagers\AppointmentsRelationManager::class,
            // PatientResource\RelationManagers\PrescriptionsRelationManager::class,
            // PatientResource\RelationManagers\LabAppointmentsRelationManager::class,
            // PatientResource\RelationManagers\NemtRequestsRelationManager::class,
            // PatientResource\RelationManagers\MembershipsRelationManager::class,
            // PatientResource\RelationManagers\PackageRequestsRelationManager::class,
        ];
    }
}
