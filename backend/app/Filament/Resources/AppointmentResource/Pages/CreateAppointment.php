<?php

namespace App\Filament\Resources\AppointmentResource\Pages;

use App\Filament\Resources\AppointmentResource;
use Filament\Resources\Pages\CreateRecord;

class CreateAppointment extends CreateRecord
{
    protected static string $resource = AppointmentResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        if (isset($data['patient_phone']) && isset($data['patient_id'])) {
            $patient = \App\Models\Patient::find($data['patient_id']);
            if ($patient) {
                $patient->phone = $data['patient_phone'];
                $patient->save();
            }
            unset($data['patient_phone']);
        }

        unset($data['patient_email']);

        return $data;
    }
}