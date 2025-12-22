<?php

namespace App\Filament\Widgets;

use App\Models\Appointment;
use Filament\Widgets\ChartWidget;

class AppointmentsChart extends ChartWidget
{
    protected ?string $heading = 'Appointments (Last 30 days)';

    protected function getData(): array
    {
        $from = now()->subDays(29)->startOfDay();
        $to = now()->endOfDay();
        $series = [];
        $labels = [];
        $counts = Appointment::query()
            ->whereBetween('created_at', [$from, $to])
            ->selectRaw('DATE(created_at) as d, COUNT(*) as c')
            ->groupBy('d')
            ->orderBy('d')
            ->get()
            ->keyBy('d');
        for ($i = 0; $i < 30; $i++) {
            $day = $from->copy()->addDays($i)->toDateString();
            $labels[] = $day;
            $series[] = (int) ($counts[$day]->c ?? 0);
        }
        return [
            'datasets' => [
                [
                    'label' => 'Appointments',
                    'data' => $series,
                    'fill' => true,
                    'borderColor' => '#3b82f6',
                    'backgroundColor' => 'rgba(59, 130, 246, 0.1)',
                    'tension' => 0.4,
                    'pointRadius' => 3,
                    'pointHoverRadius' => 6,
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
