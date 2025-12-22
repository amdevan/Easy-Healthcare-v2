<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FooterSettingResource\Pages;
use App\Models\UiSetting;
use Filament\Forms;
use Filament\Schemas\Schema;
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
            Forms\Components\TextInput::make('value.text')
                ->label('Footer text')
                ->required()
                ->maxLength(255)
                ->placeholder('Short tagline or company information'),
            Forms\Components\Repeater::make('value.links')
                ->label('Links')
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