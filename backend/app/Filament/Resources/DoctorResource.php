<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DoctorResource\Pages;
use App\Models\Doctor;
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
            Forms\Components\Select::make('specialties')
                ->label('Specializations')
                ->multiple()
                ->relationship('specialties', 'name', fn ($query) => $query->where('is_active', true))
                ->searchable()
                ->preload()
                ->native(false)
                ->placeholder('Select specialties')
                ->helperText('Choose one or more from managed specialties.'),
            Forms\Components\Textarea::make('content')
                ->rows(6)
                ->columnSpanFull()
                ->placeholder('Short bio, expertise, and patient care philosophy.')
                ->helperText('Keep it concise and patient-friendly.'),
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
            Forms\Components\TextInput::make('hospital_name')
                ->label('Hospital/Clinic name')
                ->maxLength(255)
                ->placeholder('e.g., City Care Hospital')
                ->helperText('Where the doctor consults.'),
            Forms\Components\Toggle::make('is_active')
                ->label('Status')
                ->default(true),

            // Existing fields retained
            Forms\Components\TextInput::make('location')
                ->maxLength(255)
                ->placeholder('e.g., New York, NY'),
            Forms\Components\TextInput::make('experience_years')
                ->numeric()
                ->minValue(0),
            Forms\Components\TextInput::make('rating')
                ->numeric()
                ->minValue(0)
                ->maxValue(5)
                ->step('0.1')
                ->helperText('0–5 scale. Decimals allowed.'),
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
            Tables\Columns\TextColumn::make('hospital_name')->label('Hospital')->searchable(),
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