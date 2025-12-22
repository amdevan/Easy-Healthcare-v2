<?php

namespace App\Filament\Resources\DoctorResource\Pages;

use App\Filament\Resources\DoctorResource;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Str;

class CreateDoctor extends CreateRecord
{
    protected static string $resource = DoctorResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        if (empty($data['content'] ?? '')) {
            $name = $data['name'] ?? 'Doctor';
            $spec = $data['specialization'] ?? null;
            $years = $data['experience_years'] ?? null;
            $hospital = $data['hospital_name'] ?? null;
            $location = $data['location'] ?? null;

            $first = Str::of($name)->explode(' ')->first() ?? $name;
            $parts = [];
            $parts[] = sprintf(
                '%s is a dedicated %s%s.',
                $name,
                $spec ?: 'healthcare professional',
                $hospital ? " at {$hospital}" : ''
            );
            if ($years) {
                $parts[] = sprintf('With %d years of experience, %s provides patient-centered care.', (int) $years, $first);
            }
            if ($location) {
                $parts[] = sprintf('%s is currently based in %s.', $first, $location);
            }

            $data['content'] = '<p>' . implode(' ', $parts) . '</p>';
        }

        return $data;
    }
}
