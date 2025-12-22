<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BannerResource\Pages;
use App\Models\Banner;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;

class BannerResource extends Resource
{
    protected static ?string $model = Banner::class;
    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-photo';

    public static function getNavigationGroup(): string | \UnitEnum | null
    {
        return 'UI Setting';
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Forms\Components\TextInput::make('title')
                ->required()
                ->maxLength(255)
                ->placeholder('Primary heading for the banner'),
            Forms\Components\TextInput::make('subtitle')
                ->maxLength(255)
                ->placeholder('Optional subheading'),
            Forms\Components\TextInput::make('image_url')
                ->label('Image URL')
                ->maxLength(1024)
                ->url()
                ->helperText('Use an absolute URL or a storage path.'),
            Forms\Components\TextInput::make('link_url')
                ->label('Link URL')
                ->maxLength(1024)
                ->url()
                ->helperText('Optional: where the banner links to.'),
            Forms\Components\TextInput::make('order')
                ->numeric()
                ->minValue(0)
                ->helperText('Controls display order; lower numbers show first.'),
            Forms\Components\Toggle::make('is_active')
                ->label('Active')
                ->helperText('Toggle to show or hide this banner.'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('id')->sortable(),
            Tables\Columns\TextColumn::make('title')->searchable()->sortable(),
            Tables\Columns\TextColumn::make('order')->sortable(),
            Tables\Columns\IconColumn::make('is_active')->boolean(),
            Tables\Columns\TextColumn::make('created_at')->dateTime()->toggleable(isToggledHiddenByDefault: true),
        ])->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Active')
                    ->trueLabel('Active')
                    ->falseLabel('Inactive'),
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
            'index' => Pages\ListBanners::route('/'),
            'create' => Pages\CreateBanner::route('/create'),
            'edit' => Pages\EditBanner::route('/{record}/edit'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return (string) Banner::query()->count();
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['title'];
    }
}