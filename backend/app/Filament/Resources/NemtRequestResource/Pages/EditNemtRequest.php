<?php

namespace App\Filament\Resources\NemtRequestResource\Pages;

use App\Filament\Resources\NemtRequestResource;
use Filament\Resources\Pages\EditRecord;
use Filament\Actions\DeleteAction;

class EditNemtRequest extends EditRecord
{
    protected static string $resource = NemtRequestResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
