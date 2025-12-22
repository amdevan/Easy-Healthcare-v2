<?php

namespace App\Filament\Resources\HomeSliderSettingResource\Pages;

use App\Filament\Resources\HomeSliderSettingResource;
use App\Models\UiSetting;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListHomeSliderSettings extends ListRecords
{
    protected static string $resource = HomeSliderSettingResource::class;

    protected function getHeaderActions(): array
    {
        $record = UiSetting::query()->where('key', 'home.slider')->first();
        if ($record) {
            return [
                Actions\Action::make('edit')
                    ->label('Edit Slider')
                    ->url(HomeSliderSettingResource::getUrl('edit', ['record' => $record->getKey()]))
                    ->color('primary'),
            ];
        }
        return [
            Actions\Action::make('make')
                ->label('Make Slider (Defaults)')
                ->color('primary')
                ->action(function () {
                    $record = UiSetting::query()->where('key', 'home.slider')->first();
                    if (!$record) {
                        $record = UiSetting::create([
                            'key' => 'home.slider',
                            'value' => HomeSliderSettingResource::defaultValue(),
                        ]);
                    }
                    $this->redirect(HomeSliderSettingResource::getUrl('edit', ['record' => $record->getKey()]));
                }),
            Actions\CreateAction::make()->label('Create Slider Setting'),
        ];
    }

    protected function getTableEmptyStateActions(): array
    {
        return [
            Actions\Action::make('make')
                ->label('Make Slider (Defaults)')
                ->color('primary')
                ->action(function () {
                    $record = UiSetting::query()->where('key', 'home.slider')->first();
                    if (!$record) {
                        $record = UiSetting::create([
                            'key' => 'home.slider',
                            'value' => HomeSliderSettingResource::defaultValue(),
                        ]);
                    }
                    $this->redirect(HomeSliderSettingResource::getUrl('edit', ['record' => $record->getKey()]));
                }),
            Actions\CreateAction::make()->label('Create Slider Setting'),
        ];
    }

    public function mount(): void
    {
        parent::mount();
        $record = UiSetting::query()->where('key', 'home.slider')->first();
        if ($record) {
            $this->redirect(HomeSliderSettingResource::getUrl('edit', ['record' => $record->getKey()]));
        }
    }
}
