<?php

namespace App\Filament\Widgets;

use App\Models\Membership;
use Filament\Tables;
use Filament\Widgets\TableWidget as BaseWidget;

class LatestMemberships extends BaseWidget
{
    protected static ?string $heading = 'Latest Memberships';

    protected function getTableQuery(): \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Relations\Relation|null
    {
        return Membership::query()->orderByDesc('created_at')->limit(5);
    }

    protected function getTableColumns(): array
    {
        return [
            Tables\Columns\TextColumn::make('name')->label('Name')->searchable(),
            Tables\Columns\TextColumn::make('plan_type')->label('Plan')->badge(),
            Tables\Columns\TextColumn::make('status')->label('Status')->badge(),
            Tables\Columns\TextColumn::make('created_at')->label('Joined')->date(),
        ];
    }
}
