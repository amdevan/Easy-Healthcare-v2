<?php

namespace App\Filament\Pages;

use Filament\Pages\Dashboard as BaseDashboard;

class Dashboard extends BaseDashboard
{
    protected function getHeaderWidgets(): array
    {
        return [
            \App\Filament\Widgets\StatsOverview::class,
        ];
    }

    public function getWidgets(): array
    {
        return [
            \App\Filament\Widgets\AppointmentsChart::class,
            \App\Filament\Widgets\LatestMemberships::class,
        ];
    }

    public function getColumns(): int
    {
        return 2;
    }
}
