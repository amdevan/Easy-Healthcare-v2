<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SpecialtyResource\Pages;
use App\Models\Specialty;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;

class SpecialtyResource extends Resource
{
    protected static ?string $model = Specialty::class;
    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-clipboard-document-list';

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Forms\Components\FileUpload::make('icon_path')
                ->label('Icon')
                ->image()
                ->disk('public')
                ->directory('specialties')
                ->maxSize(1024)
                ->acceptedFileTypes(['image/png','image/jpeg','image/webp','image/svg+xml'])
                ->imagePreviewHeight('80')
                ->downloadable()
                ->openable()
                ->helperText('Upload a small square icon (PNG/JPG/WebP/SVG).'),
            // Bind to a separate field and sync into icon_path to avoid type conflicts
            Forms\Components\Select::make('icon_from_media')
                ->label('Choose from Media')
                ->options(function () {
                    $files = collect(Storage::disk('public')->files('specialties'))
                        ->filter(function ($path) {
                            return Str::endsWith($path, ['.png', '.jpg', '.jpeg', '.webp', '.svg']);
                        })
                        ->mapWithKeys(function ($path) {
                            return [$path => basename($path)];
                        });
                    return $files->toArray();
                })
                ->searchable()
                ->preload()
                ->native(false)
                ->dehydrated(false)
                ->reactive()
                ->afterStateUpdated(function ($state, callable $set) {
                    if (!empty($state)) {
                        $set('icon_path', $state);
                    }
                })
                ->helperText('Pick an existing icon from storage (public/specialties).'),
            Forms\Components\TextInput::make('name')
                ->required()
                ->maxLength(255)
                ->placeholder('e.g., Cardiology')
                ->reactive()
                ->afterStateUpdated(function ($state, callable $set) {
                    if (!empty($state)) {
                        $set('slug', Str::slug($state));
                    }
                }),
            Forms\Components\TextInput::make('slug')
                ->required()
                ->maxLength(255)
                ->placeholder('cardiology')
                ->helperText('Unique identifier; use lowercase and dashes.')
                ->unique('specialties', 'slug', ignoreRecord: true),
            Forms\Components\Toggle::make('is_active')->label('Active')->default(true),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\ImageColumn::make('icon_path')
                ->label('Icon')
                ->circular()
                ->size(28),
            Tables\Columns\TextColumn::make('id')->sortable(),
            Tables\Columns\TextColumn::make('name')->searchable()->sortable(),
            Tables\Columns\TextColumn::make('slug')->searchable()->sortable(),
            Tables\Columns\IconColumn::make('is_active')->boolean(),
            Tables\Columns\TextColumn::make('created_at')->dateTime()->toggleable(isToggledHiddenByDefault: true),
        ])->defaultSort('created_at', 'desc')
            ->filters([
            ])
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
            ])->bulkActions([
                DeleteBulkAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSpecialties::route('/'),
            'create' => Pages\CreateSpecialty::route('/create'),
            'edit' => Pages\EditSpecialty::route('/{record}/edit'),
        ];
    }
}