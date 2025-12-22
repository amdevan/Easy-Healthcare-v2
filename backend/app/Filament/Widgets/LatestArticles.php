<?php

namespace App\Filament\Widgets;

use App\Models\Article;
use Filament\Tables; 
use Filament\Widgets\TableWidget as BaseWidget;

class LatestArticles extends BaseWidget
{
    protected static ?string $heading = 'Latest Articles';

    protected function getTableQuery(): \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Relations\Relation|null
    {
        return Article::query()->orderByDesc('published_at')->limit(5);
    }

    protected function getTableColumns(): array
    {
        return [
            Tables\Columns\TextColumn::make('title')->label('Title')->wrap()->searchable(),
            Tables\Columns\TextColumn::make('author')->label('Author')->toggleable(isToggledHiddenByDefault: true),
            Tables\Columns\TextColumn::make('published_at')->label('Published')->dateTime(),
        ];
    }
}
