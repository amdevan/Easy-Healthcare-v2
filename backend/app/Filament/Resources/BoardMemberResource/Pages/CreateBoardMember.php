<?php

namespace App\Filament\Resources\BoardMemberResource\Pages;

use App\Filament\Resources\BoardMemberResource;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Arr;

class CreateBoardMember extends CreateRecord
{
    protected static string $resource = BoardMemberResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['order'] = (int) Arr::get($data, 'order', 0);
        return $data;
    }
}
