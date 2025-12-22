<?php

namespace App\Filament\Resources\HomeSliderSettingResource\Pages;

use App\Filament\Resources\HomeSliderSettingResource;
use Filament\Resources\Pages\CreateRecord;

class CreateHomeSliderSetting extends CreateRecord
{
    protected static string $resource = HomeSliderSettingResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['key'] = 'home.slider';
        return $data;
    }
}

