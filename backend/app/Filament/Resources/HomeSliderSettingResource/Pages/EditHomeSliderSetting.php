<?php

namespace App\Filament\Resources\HomeSliderSettingResource\Pages;

use App\Filament\Resources\HomeSliderSettingResource;
use App\Models\UiSetting;
use Filament\Forms;
use Filament\Actions;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\EditRecord;

class EditHomeSliderSetting extends EditRecord
{
    protected static string $resource = HomeSliderSettingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('reset')
                ->label('Reset to Defaults')
                ->requiresConfirmation()
                ->color('danger')
                ->action(function () {
                    $this->record->update(['value' => HomeSliderSettingResource::defaultValue()]);
                    Notification::make()->title('Slider reset to defaults')->success()->send();
                }),

            Actions\Action::make('import')
                ->label('Import JSON')
                ->form([
                    Forms\Components\Textarea::make('json')->rows(10)->required(),
                ])
                ->action(function (array $data) {
                    $parsed = json_decode($data['json'] ?? '', true);
                    if (!is_array($parsed)) {
                        Notification::make()->title('Invalid JSON')->danger()->send();
                        return;
                    }
                    $slides = $parsed['slides'] ?? (is_array($parsed) ? $parsed : []);
                    if (!is_array($slides)) $slides = [];
                    $slides = array_values(array_filter(array_map(function ($s) {
                        return [
                            'src' => isset($s['src']) ? (string) $s['src'] : '',
                            'alt' => isset($s['alt']) && $s['alt'] !== null ? (string) $s['alt'] : null,
                            'href' => isset($s['href']) && $s['href'] !== null ? (string) $s['href'] : null,
                        ];
                    }, $slides), function ($s) { return !empty($s['src']); }));

                    $opts = $parsed['options'] ?? [];
                    $value = [
                        'slides' => $slides,
                        'options' => [
                            'autoPlay' => isset($opts['autoPlay']) ? (bool) $opts['autoPlay'] : true,
                            'intervalMs' => isset($opts['intervalMs']) && is_numeric($opts['intervalMs']) ? max(500, (int) $opts['intervalMs']) : 4500,
                            'pauseOnHover' => isset($opts['pauseOnHover']) ? (bool) $opts['pauseOnHover'] : true,
                            'showCaptions' => isset($opts['showCaptions']) ? (bool) $opts['showCaptions'] : true,
                            'showButton' => isset($opts['showButton']) ? (bool) $opts['showButton'] : true,
                            'buttonText' => isset($opts['buttonText']) && is_string($opts['buttonText']) && trim($opts['buttonText']) !== '' ? (string) $opts['buttonText'] : 'View',
                        ],
                    ];

                    $this->record->update(['value' => $value]);
                    Notification::make()->title('Imported slider JSON')->success()->send();
                }),
        ];
    }
}
