<?php

namespace App\Filament\Resources;

use App\Filament\Resources\HeaderSettingResource\Pages;
use App\Models\UiSetting;
use Filament\Forms;
use Filament\Schemas\Schema;
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
            Forms\Components\TextInput::make('value.logo_url')
                ->label('Logo URL')
                ->url()
                ->maxLength(255)
                ->placeholder('https://example.com/logo.png'),
            Forms\Components\TextInput::make('value.cta.label')
                ->label('CTA Label')
                ->maxLength(100)
                ->placeholder('e.g., Get Started'),
            Forms\Components\TextInput::make('value.cta.href')
                ->label('CTA Link')
                ->url()
                ->maxLength(255)
                ->placeholder('https://example.com/signup'),
            Forms\Components\Repeater::make('value.links')
                ->label('Navigation links')
                ->schema([
                    Forms\Components\TextInput::make('label')->required()->maxLength(100),
                    Forms\Components\TextInput::make('href')->required()->url()->maxLength(255),
                ])
                ->default([])
                ->columnSpanFull(),
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