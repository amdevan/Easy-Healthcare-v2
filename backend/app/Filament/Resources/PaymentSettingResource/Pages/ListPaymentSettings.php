<?php

namespace App\Filament\Resources\PaymentSettingResource\Pages;

use App\Filament\Resources\PaymentSettingResource;
use Filament\Resources\Pages\ListRecords;
use Filament\Actions\CreateAction;

class ListPaymentSettings extends ListRecords
{
    protected static string $resource = PaymentSettingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
