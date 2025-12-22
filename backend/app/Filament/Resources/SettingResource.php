<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SettingResource\Pages;
use App\Models\UiSetting;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Illuminate\Database\Eloquent\Builder;

class SettingResource extends Resource
{
    protected static ?string $model = UiSetting::class;
    protected static ?string $modelLabel = 'Setting';
    protected static ?string $pluralModelLabel = 'Settings';
    protected static ?string $navigationLabel = 'Settings';

    public static function getNavigationGroup(): string | \UnitEnum | null
    {
        return 'Settings';
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Forms\Components\TextInput::make('key')->required()->maxLength(255),
            Forms\Components\KeyValue::make('value')->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('id')->sortable(),
            Tables\Columns\TextColumn::make('key')->searchable()->sortable(),
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
            'index' => Pages\ListSettings::route('/'),
            'create' => Pages\CreateSetting::route('/create'),
            'edit' => Pages\EditSetting::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        // Exclude UI-specific keys managed by Header/Footer resources
        return parent::getEloquentQuery()->whereNotIn('key', ['header', 'footer']);
    }
}