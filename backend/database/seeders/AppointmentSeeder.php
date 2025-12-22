<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Appointment;
use App\Models\Doctor;

class AppointmentSeeder extends Seeder
{
    public function run(): void
    {
        $doctor = Doctor::first();
        if (! $doctor) {
            return; // rely on DatabaseSeeder doctors
        }

        $appointments = [
            [
                'patient_name' => 'Rohit Kumar',
                'doctor_id' => $doctor->id,
                'scheduled_at' => now()->addDays(1)->setTime(10, 30),
                'status' => 'confirmed',
                'notes' => 'First-time consultation',
            ],
            [
                'patient_name' => 'Sneha Gupta',
                'doctor_id' => $doctor->id,
                'scheduled_at' => now()->addDays(2)->setTime(14, 0),
                'status' => 'pending',
                'notes' => 'Follow-up appointment',
            ],
        ];

        foreach ($appointments as $a) {
            Appointment::firstOrCreate([
                'doctor_id' => $a['doctor_id'],
                'scheduled_at' => $a['scheduled_at'],
            ], $a);
        }
    }
}