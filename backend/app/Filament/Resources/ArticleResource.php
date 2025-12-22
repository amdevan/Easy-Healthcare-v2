<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ArticleResource\Pages;
use App\Models\Article;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;

class ArticleResource extends Resource
{
    protected static ?string $model = Article::class;
    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-document-text';

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
                ->placeholder('Enter a clear, descriptive title'),
            Forms\Components\TextInput::make('slug')
                ->required()
                ->maxLength(255)
                ->helperText('Used in URLs; keep it short and unique.'),
            Forms\Components\Textarea::make('content')
                ->columnSpanFull()
                ->rows(12)
                ->placeholder('Write the article body here...'),
            Forms\Components\DateTimePicker::make('published_at')
                ->label('Publish at')
                ->helperText('Optional: schedule when the article goes live.'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('id')->sortable(),
            Tables\Columns\TextColumn::make('title')->searchable()->sortable(),
            Tables\Columns\TextColumn::make('slug')->searchable()->sortable(),
            Tables\Columns\TextColumn::make('published_at')->dateTime(),
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
            'index' => Pages\ListArticles::route('/'),
            'create' => Pages\CreateArticle::route('/create'),
            'edit' => Pages\EditArticle::route('/{record}/edit'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return (string) Article::query()->count();
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['title', 'slug'];
    }
}