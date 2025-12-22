<?php

namespace App\Filament\Resources\NemtRequestResource\Pages;

use App\Filament\Resources\NemtRequestResource;
use Filament\Resources\Pages\ListRecords;
use Filament\Actions\CreateAction;

class ListNemtRequests extends ListRecords
{
    protected static string $resource = NemtRequestResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
