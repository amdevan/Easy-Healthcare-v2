<?php

namespace App\Filament\Widgets;

use App\Models\Membership;
use App\Models\Doctor;
use App\Models\LabTest;
use App\Models\Specialty;
use App\Models\Appointment;
use App\Models\Patient;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends StatsOverviewWidget
{
    protected ?string $pollingInterval = '15s';

    protected function getStats(): array
    {
        $stats = [
            Stat::make('Doctors', (string) Doctor::count())
                ->description('Total registered doctors')
                ->descriptionIcon('heroicon-m-user-group')
                ->color('success')
                ->chart([7, 2, 10, 3, 15, 4, 17]),
            Stat::make('Specialties', (string) Specialty::count())
                ->description('Medical disciplines')
                ->descriptionIcon('heroicon-m-academic-cap')
                ->color('primary'),
            Stat::make('Lab Tests', (string) LabTest::count())
                ->description('Available diagnostic tests')
                ->descriptionIcon('heroicon-m-beaker')
                ->color('info'),
            Stat::make('Memberships', (string) Membership::count())
                ->description('Active memberships')
                ->descriptionIcon('heroicon-m-credit-card')
                ->color('purple'),
            Stat::make('Appointments', (string) Appointment::count())
                ->description('Total scheduled visits')
                ->descriptionIcon('heroicon-m-calendar')
                ->color('warning')
                ->chart([15, 4, 10, 2, 12, 4, 12]),
            Stat::make('Patients', (string) Patient::count())
                ->description('Registered patients')
                ->descriptionIcon('heroicon-m-users')
                ->color('success')
                ->chart([3, 5, 10, 8, 15, 12, 18]),
        ];

        if (Schema::hasTable('nemt_requests')) {
            $stats[] = Stat::make('NEMT Requests', (string) DB::table('nemt_requests')->count())
                ->description('Transport requests')
                ->descriptionIcon('heroicon-m-truck')
                ->color('danger');
        }
        if (Schema::hasTable('package_requests')) {
            $stats[] = Stat::make('Package Requests', (string) DB::table('package_requests')->count())
                ->description('Wellness packages')
                ->descriptionIcon('heroicon-m-gift')
                ->color('primary');
        }

        return $stats;
    }

    protected function getColumns(): int
    {
        return 4;
    }
}
