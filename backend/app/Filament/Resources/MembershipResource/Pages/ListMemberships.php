<?php

namespace App\Filament\Resources\MembershipResource\Pages;

use App\Filament\Resources\MembershipResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListMemberships extends ListRecords
{
    protected static string $resource = MembershipResource::class;

    public function getSubheading(): ?string
    {
        return 'Manage member applications, renewals, and statuses.';
    }

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()
                ->label('New Membership'),
        ];
    }
}
