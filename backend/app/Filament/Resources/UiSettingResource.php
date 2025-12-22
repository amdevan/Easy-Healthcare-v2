<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UiSettingResource\Pages;
use App\Models\UiSetting;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;

class UiSettingResource extends Resource
{
    protected static ?string $model = UiSetting::class;
    protected static ?string $modelLabel = 'UI Setting';
    protected static ?string $pluralModelLabel = 'UI Setting';
    protected static ?string $navigationLabel = 'UI Setting';

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
            'index' => Pages\ListUiSettings::route('/'),
            'create' => Pages\CreateUiSetting::route('/create'),
            'edit' => Pages\EditUiSetting::route('/{record}/edit'),
        ];
    }
}