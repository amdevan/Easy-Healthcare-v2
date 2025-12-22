<?php

namespace App\Filament\Resources\DoctorResource\Pages;

use App\Filament\Resources\DoctorResource;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Str;

class EditDoctor extends EditRecord
{
    protected static string $resource = DoctorResource::class;

    protected function mutateFormDataBeforeFill(array $data): array
    {
        if (empty($data['content'] ?? '')) {
            $name = $data['name'] ?? ($this->record->name ?? 'Doctor');
            $spec = $data['specialization'] ?? ($this->record->specialization ?? null);
            $years = $data['experience_years'] ?? ($this->record->experience_years ?? null);
            $hospital = $data['hospital_name'] ?? ($this->record->hospital_name ?? null);
            $location = $data['location'] ?? ($this->record->location ?? null);

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

    protected function mutateFormDataBeforeSave(array $data): array
    {
        // Auto-generate Professional Journey content when empty
        if (empty($data['content'] ?? '')) {
            $name = $data['name'] ?? ($this->record->name ?? 'Doctor');
            $spec = $data['specialization'] ?? ($this->record->specialization ?? null);
            $years = $data['experience_years'] ?? ($this->record->experience_years ?? null);
            $hospital = $data['hospital_name'] ?? ($this->record->hospital_name ?? null);
            $location = $data['location'] ?? ($this->record->location ?? null);

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
