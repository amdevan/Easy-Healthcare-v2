<?php

namespace App\Filament\Widgets;

use App\Models\Article;
use App\Models\Doctor;
use App\Models\LabTest;
use App\Models\Specialty;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Doctors', (string) Doctor::count()),
            Stat::make('Specialties', (string) Specialty::count()),
            Stat::make('Lab Tests', (string) LabTest::count()),
            Stat::make('Articles', (string) Article::count()),
        ];
    }
}