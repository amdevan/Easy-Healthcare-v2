<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FooterSettingResource\Pages;
use App\Models\UiSetting;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Components\Section;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteBulkAction;
use Illuminate\Database\Eloquent\Builder;

class FooterSettingResource extends Resource
{
    protected static ?string $model = UiSetting::class;
    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-cog-8-tooth';

    protected static ?string $modelLabel = 'Footer setting';
    protected static ?string $pluralModelLabel = 'Footer settings';
    protected static ?string $navigationLabel = 'Footer setting';

    public static function getNavigationGroup(): string | \UnitEnum | null
    {
        return 'UI Setting';
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Tabs::make('Tabs')
                ->tabs([
                    Tab::make('General Info')
                        ->schema([
                            Forms\Components\TextInput::make('value.title')
                                ->label('Company Title')
                                ->default('Easy Healthcare 101'),
                            Forms\Components\Textarea::make('value.description')
                                ->label('Description')
                                ->rows(3),
                            Forms\Components\TextInput::make('value.phone')
                                ->label('Phone')
                                ->tel(),
                            Forms\Components\TextInput::make('value.email')
                                ->label('Email')
                                ->email(),
                            Forms\Components\TextInput::make('value.address')
                                ->label('Address'),
                            Forms\Components\TextInput::make('value.copyright')
                                ->label('Copyright Text')
                                ->default('© 2024 Easy Healthcare 101. All rights reserved.'),
                        ])->columns(2),
                    
                    Tab::make('Links & Columns')
                        ->schema([
                            Forms\Components\Repeater::make('value.columns')
                                ->label('Footer Columns')
                                ->schema([
                                    Forms\Components\TextInput::make('title')
                                        ->label('Column Title')
                                        ->required(),
                                    Forms\Components\Repeater::make('links')
                                        ->schema([
                                            Forms\Components\TextInput::make('label')->required(),
                                            Forms\Components\TextInput::make('url')->required(),
                                            Forms\Components\Toggle::make('new_tab')->label('New Tab'),
                                        ])
                                ])
                                ->itemLabel(fn (array $state): ?string => $state['title'] ?? null)
                                ->collapsed(),
                        ]),

                    Tab::make('Social & Apps')
                        ->schema([
                            Forms\Components\Repeater::make('value.social_links')
                                ->label('Social Media Links')
                                ->schema([
                                    Forms\Components\Select::make('platform')
                                        ->options([
                                            'facebook' => 'Facebook',
                                            'twitter' => 'Twitter',
                                            'linkedin' => 'LinkedIn',
                                            'instagram' => 'Instagram',
                                            'youtube' => 'YouTube',
                                        ])
                                        ->required(),
                                    Forms\Components\TextInput::make('url')
                                        ->url()
                                        ->required(),
                                ])->columns(2),
                            
                            Section::make('App Links')
                                ->schema([
                                    Forms\Components\TextInput::make('value.android_app_link')
                                        ->label('Google Play Store Link')
                                        ->url(),
                                    Forms\Components\TextInput::make('value.ios_app_link')
                                        ->label('Apple App Store Link')
                                        ->url(),
                                ])->columns(2),
                        ]),
                        
                    Tab::make('Newsletter')
                        ->schema([
                            Forms\Components\TextInput::make('value.newsletter_title')
                                ->label('Title')
                                ->default('Stay Updated'),
                            Forms\Components\Textarea::make('value.newsletter_description')
                                ->label('Description')
                                ->rows(2),
                        ]),
                ])->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('id')->sortable(),
            Tables\Columns\TextColumn::make('key')->sortable()->label('Key'),
            Tables\Columns\TextColumn::make('value.text')->label('Footer text')->wrap(),
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
            'index' => Pages\ListFooterSettings::route('/'),
            'edit' => Pages\EditFooterSetting::route('/{record}/edit'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return (string) UiSetting::query()->where('key', 'footer')->count();
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->where('key', 'footer');
    }
}