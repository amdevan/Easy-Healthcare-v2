<?php

namespace App\Filament\Resources;

use App\Filament\Resources\HeaderSettingResource\Pages;
use App\Models\UiSetting;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteBulkAction;
use Illuminate\Database\Eloquent\Builder;

class HeaderSettingResource extends Resource
{
    protected static ?string $model = UiSetting::class;
    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-cog-8-tooth';

    protected static ?string $modelLabel = 'Header setting';
    protected static ?string $pluralModelLabel = 'Header settings';
    protected static ?string $navigationLabel = 'Header setting';

    public static function getNavigationGroup(): string | \UnitEnum | null
    {
        return 'UI Setting';
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Section::make('Top Bar')
                ->description('Manage the top information bar (Address, Phone, Login).')
                ->schema([
                    Forms\Components\Toggle::make('value.top_bar.enabled')
                        ->label('Enable Top Bar')
                        ->default(true)
                        ->columnSpanFull(),
                    Forms\Components\TextInput::make('value.top_bar.address')
                        ->label('Address')
                        ->default('Kathmandu, Nepal')
                        ->prefixIcon('heroicon-o-map-pin'),
                    Forms\Components\TextInput::make('value.top_bar.phone')
                        ->label('Support Phone')
                        ->default('+977 1-4510101')
                        ->prefixIcon('heroicon-o-phone'),
                    Forms\Components\TextInput::make('value.top_bar.login_label')
                        ->label('Login Label')
                        ->default('Patient Login'),
                    Forms\Components\TextInput::make('value.top_bar.login_href')
                        ->label('Login URL')
                        ->default('/patient-login'),
                    Forms\Components\Repeater::make('value.top_bar.action_buttons')
                        ->label('Action Buttons')
                        ->schema([
                            Forms\Components\TextInput::make('label')
                                ->label('Label')
                                ->required(),
                            Forms\Components\TextInput::make('href')
                                ->label('URL')
                                ->required(),
                            Forms\Components\Select::make('variant')
                                ->label('Style')
                                ->options([
                                    'primary' => 'Primary (Blue)',
                                    'secondary' => 'Secondary (White/Outline)',
                                ])
                                ->default('primary'),
                        ])
                        ->columnSpanFull()
                        ->grid(2),
                ])->columns(2),

            Section::make('Branding')
                ->description('Manage your site logo and visual identity.')
                ->schema([
                    Forms\Components\FileUpload::make('value.logo_url')
                        ->label('Logo Image')
                        ->image()
                        ->directory('ui-settings')
                        ->visibility('public')
                        ->imagePreviewHeight('100')
                        ->columnSpanFull(),
                    Forms\Components\TextInput::make('value.logo_height')
                        ->label('Logo Height (px)')
                        ->numeric()
                        ->default(40)
                        ->minValue(20)
                        ->maxValue(200)
                        ->suffix('px'),
                    Forms\Components\TextInput::make('value.brand_name')
                        ->label('Brand Name')
                        ->maxLength(100)
                        ->placeholder('Leave empty to hide')
                        ->columnSpanFull(),
                    Forms\Components\Toggle::make('value.show_brand_name')
                        ->label('Show Brand Name')
                        ->default(true)
                        ->columnSpanFull(),
                ])->columns(1),

            Section::make('Navigation Links')
                ->description('Manage the main menu links.')
                ->schema([
                    Forms\Components\Repeater::make('value.links')
                        ->label('Menu Items')
                        ->schema([
                            Forms\Components\TextInput::make('label')
                                ->label('Label')
                                ->required()
                                ->maxLength(100),
                            Forms\Components\TextInput::make('href')
                                ->label('URL')
                                ->required()
                                ->maxLength(255),
                            Forms\Components\Select::make('type')
                                ->label('Type')
                                ->options([
                                    'link' => 'Simple Link',
                                    'services_dropdown' => 'Services Dropdown',
                                    'about_dropdown' => 'About Dropdown',
                                ])
                                ->default('link')
                                ->required(),
                        ])
                        ->default([])
                        ->columns(2)
                        ->columnSpanFull(),
                ]),

            Section::make('Dropdown Menus')
                ->description('Manage the content of dropdown menus (Services, About).')
                ->schema([
                    Forms\Components\Repeater::make('value.services_menu')
                        ->label('Services Menu Items')
                        ->schema([
                            Forms\Components\TextInput::make('label')
                                ->label('Label')
                                ->required()
                                ->maxLength(100),
                            Forms\Components\TextInput::make('href')
                                ->label('URL')
                                ->required()
                                ->maxLength(255),
                        ])
                        ->default([])
                        ->columns(2)
                        ->columnSpanFull(),

                    Forms\Components\Repeater::make('value.about_menu')
                        ->label('About Menu Items')
                        ->schema([
                            Forms\Components\TextInput::make('label')
                                ->label('Label')
                                ->required()
                                ->maxLength(100),
                            Forms\Components\TextInput::make('href')
                                ->label('URL')
                                ->required()
                                ->maxLength(255),
                            Forms\Components\Textarea::make('desc')
                                ->label('Description')
                                ->rows(2)
                                ->maxLength(255),
                        ])
                        ->default([])
                        ->columns(2)
                        ->columnSpanFull(),
                ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('id')->sortable(),
            Tables\Columns\TextColumn::make('key')->sortable()->label('Key'),
            Tables\Columns\TextColumn::make('value.cta.label')->label('CTA')->wrap(),
            Tables\Columns\TextColumn::make('created_at')->dateTime()->toggleable(isToggledHiddenByDefault: true),
        ])->defaultSort('created_at', 'desc')
            ->filters([
            ])
            ->actions([
                EditAction::make(),
            ])->bulkActions([
                DeleteBulkAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListHeaderSettings::route('/'),
            'create' => Pages\CreateHeaderSetting::route('/create'),
            'edit' => Pages\EditHeaderSetting::route('/{record}/edit'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return (string) UiSetting::query()->where('key', 'header')->count();
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->where('key', 'header');
    }
}
