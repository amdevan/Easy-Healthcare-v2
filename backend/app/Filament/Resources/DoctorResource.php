<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DoctorResource\Pages;
use App\Models\Doctor;
use Illuminate\Support\Str;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;

class DoctorResource extends Resource
{
    protected static ?string $model = Doctor::class;
    protected static ?string $navigationLabel = 'Doctors';
    protected static ?int $navigationSort = 4;

    public static function getNavigationGroup(): string | \UnitEnum | null
    {
        return 'Main';
    }


    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Forms\Components\FileUpload::make('profile_photo_path')
                ->label('Profile picture')
                ->image()
                ->disk('public')
                ->directory('doctors')
                ->maxSize(2048)
                ->acceptedFileTypes(['image/jpeg','image/png','image/webp'])
                ->imagePreviewHeight('150')
                ->helperText('PNG/JPG/WebP up to 2 MB. Recommend square image.')
                ->downloadable()
                ->openable()
                ->columnSpanFull(),
            // Requested fields
            Forms\Components\TextInput::make('name')
                ->required()
                ->maxLength(255)
                ->placeholder('e.g., Dr. Jane Doe')
                ->helperText('Full name with professional title.'),
            Forms\Components\TextInput::make('position')
                ->maxLength(255)
                ->placeholder('e.g., Senior Consultant')
                ->helperText('Role or designation at the hospital.'),
            Forms\Components\TextInput::make('specialization')
                ->label('Specialization (text)')
                ->maxLength(255)
                ->placeholder('e.g., Cardiology')
                ->helperText('Plain text specialization shown on the site.'),
            Forms\Components\CheckboxList::make('appointment_type')
                ->label('Appointment Types')
                ->options([
                    'Online' => 'Online',
                    'In-Clinic' => 'In-Clinic',
                    'Home Visit' => 'Home Visit',
                ])
                ->columns(3)
                ->live(),
            Forms\Components\TextInput::make('consultation_fee_clinic')
                ->label('Consultation Fee (In-Clinic)')
                ->numeric()
                ->prefix('Rs.')
                ->visible(fn ($get) => in_array('In-Clinic', $get('appointment_type') ?? [])),
            Forms\Components\TextInput::make('consultation_fee_online')
                ->label('Consultation Fee (Online)')
                ->numeric()
                ->prefix('Rs.')
                ->visible(fn ($get) => in_array('Online', $get('appointment_type') ?? [])),
            Forms\Components\TextInput::make('consultation_fee_home')
                ->label('Consultation Fee (Home Visit)')
                ->numeric()
                ->prefix('Rs.')
                ->visible(fn ($get) => in_array('Home Visit', $get('appointment_type') ?? [])),
            Forms\Components\TextInput::make('nmc_no')
                ->label('NMC No')
                ->maxLength(255)
                ->placeholder('e.g., NMC-12345'),
            Forms\Components\Select::make('specialties')
                ->label('Specializations')
                ->multiple()
                ->relationship('specialties', 'name', fn ($query) => $query->where('is_active', true))
                ->searchable()
                ->preload()
                ->native(false)
                ->placeholder('Select specialties')
                ->helperText('Choose one or more from managed specialties.'),
            Forms\Components\RichEditor::make('content')
                ->label('Content')
                ->columnSpanFull()
                ->default(function (?Doctor $record) {
                    if ($record && $record->content) return $record->content;
                    if (!$record) return null;
                    $name = $record->name ?? 'Doctor';
                    $spec = $record->specialization ?? null;
                    $years = $record->experience_years ?? null;
                    $hospitals = $record->hospitals ?? [];
                    $hospital = is_array($hospitals) && count($hospitals) > 0 ? implode(', ', $hospitals) : ($record->hospital_name ?? null);
                    $location = $record->location ?? null;
                    $first = Str::of($name)->explode(' ')->first() ?? $name;
                    $parts = [];
                    $parts[] = sprintf(
                        '%s is a dedicated %s%s.',
                        $name,
                        $spec ?: 'healthcare professional',
                        $hospital ? " at {$hospital}" : ''
                    );
                    if ($years) {
                        $parts[] = sprintf('With %d years of experience, %s provides patient-centered care.', (int) $years, $first);
                    }
                    if ($location) {
                        $parts[] = sprintf('%s is currently based in %s.', $first, $location);
                    }
                    return '<p>' . implode(' ', $parts) . '</p>';
                })
                ->helperText('If left blank, it will be auto-generated from the doctor’s details.'),
            Forms\Components\Repeater::make('availability')
                ->label('Availability (Days & Time)')
                ->helperText('Add one or more weekly time slots.')
                ->schema([
                    Forms\Components\Select::make('day')
                        ->options([
                            'Monday' => 'Monday',
                            'Tuesday' => 'Tuesday',
                            'Wednesday' => 'Wednesday',
                            'Thursday' => 'Thursday',
                            'Friday' => 'Friday',
                            'Saturday' => 'Saturday',
                            'Sunday' => 'Sunday',
                        ])
                        ->required(),
                    Forms\Components\TimePicker::make('start')
                        ->label('Start time')
                        ->seconds(false)
                        ->format('H:i')
                        ->displayFormat('h:mm a')
                        ->minutesStep(15)
                        ->required(),
                    Forms\Components\TimePicker::make('end')
                        ->label('End time')
                        ->seconds(false)
                        ->format('H:i')
                        ->displayFormat('h:mm a')
                        ->minutesStep(15)
                        ->required(),
                ])
                ->columns(3)
                ->collapsible(),
            Forms\Components\TagsInput::make('hospitals')
                ->label('Hospitals/Clinics')
                ->placeholder('Add hospital...')
                ->helperText('Type and press enter to add multiple hospitals.'),
            Forms\Components\Toggle::make('is_active')
                ->label('Status')
                ->default(true),

            // Existing fields retained
            Forms\Components\TextInput::make('location')
                ->maxLength(255)
                ->placeholder('e.g., New York, NY'),
            Forms\Components\TextInput::make('experience_years')
                ->numeric()
                ->default(0)
                ->minValue(0)
                ->dehydrateStateUsing(fn ($state) => $state ?? 0),
            Forms\Components\TextInput::make('rating')
                ->numeric()
                ->default(0)
                ->minValue(0)
                ->maxValue(5)
                ->step('0.1')
                ->helperText('0–5 scale. Decimals allowed.')
                ->dehydrateStateUsing(fn ($state) => $state ?? 0),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('id')->sortable(),
            Tables\Columns\ImageColumn::make('profile_photo_path')
                ->label('Photo')
                ->circular()
                ->size(40),
            Tables\Columns\TextColumn::make('name')->searchable()->sortable(),
            Tables\Columns\TextColumn::make('specialties.name')
                ->label('Specializations')
                ->badge()
                ->separator(', ')
                ->searchable(),
            Tables\Columns\TextColumn::make('hospitals')
                ->label('Hospitals')
                ->badge()
                ->separator(', ')
                ->searchable(),
            Tables\Columns\TextColumn::make('location')->searchable(),
            Tables\Columns\TextColumn::make('experience_years')->label('Experience (yrs)'),
            Tables\Columns\TextColumn::make('rating'),
            Tables\Columns\IconColumn::make('is_active')->boolean()->label('Active'),
            Tables\Columns\TextColumn::make('created_at')->dateTime()->toggleable(isToggledHiddenByDefault: true),
        ])->filters([
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
            'index' => Pages\ListDoctors::route('/'),
            'create' => Pages\CreateDoctor::route('/create'),
            'edit' => Pages\EditDoctor::route('/{record}/edit'),
        ];
    }
}
