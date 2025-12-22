<?php

namespace App\Filament\Resources\BoardMemberResource\Pages;

use App\Filament\Resources\BoardMemberResource;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Arr;

class EditBoardMember extends EditRecord
{
    protected static string $resource = BoardMemberResource::class;

    protected function mutateFormDataBeforeSave(array $data): array
    {
        $data['order'] = (int) Arr::get($data, 'order', 0);
        return $data;
    }
}
