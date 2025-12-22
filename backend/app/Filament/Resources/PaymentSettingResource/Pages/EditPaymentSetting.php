<?php

namespace App\Filament\Resources\PaymentSettingResource\Pages;

use App\Filament\Resources\PaymentSettingResource;
use Filament\Resources\Pages\EditRecord;
use Filament\Actions\DeleteAction;

class EditPaymentSetting extends EditRecord
{
    protected static string $resource = PaymentSettingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
