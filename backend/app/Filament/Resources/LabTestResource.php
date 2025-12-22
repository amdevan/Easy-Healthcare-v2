<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LabTestResource\Pages;
use App\Models\LabTest;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;

class LabTestResource extends Resource
{
    protected static ?string $model = LabTest::class;

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Forms\Components\TextInput::make('name')->required()->maxLength(255),
            Forms\Components\TextInput::make('code')->maxLength(255),
            Forms\Components\Textarea::make('description')->columnSpanFull(),
            Forms\Components\TextInput::make('price')->numeric()->minValue(0)->step('0.01'),
            Forms\Components\TextInput::make('duration_minutes')->numeric()->minValue(0),
            Forms\Components\Toggle::make('home_collection_available'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('id')->sortable(),
            Tables\Columns\TextColumn::make('name')->searchable()->sortable(),
            Tables\Columns\TextColumn::make('code')->searchable(),
            Tables\Columns\TextColumn::make('price')->money('INR'),
            Tables\Columns\TextColumn::make('duration_minutes')->label('Duration (min)'),
            Tables\Columns\IconColumn::make('home_collection_available')->boolean(),
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
            'index' => Pages\ListLabTests::route('/'),
            'create' => Pages\CreateLabTest::route('/create'),
            'edit' => Pages\EditLabTest::route('/{record}/edit'),
        ];
    }
}