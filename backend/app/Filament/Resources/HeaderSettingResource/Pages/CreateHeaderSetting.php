<?php

namespace App\Filament\Resources\HeaderSettingResource\Pages;

use App\Filament\Resources\HeaderSettingResource;
use Filament\Resources\Pages\CreateRecord;

class CreateHeaderSetting extends CreateRecord
{
    protected static string $resource = HeaderSettingResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        // Always store under the 'header' key
        $data['key'] = 'header';
        return $data;
    }
}