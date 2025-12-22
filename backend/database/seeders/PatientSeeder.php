<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Patient;
use App\Models\Doctor;
use App\Models\Appointment;

class PatientSeeder extends Seeder
{
    public function run(): void
    {
        $doctor = Doctor::first();
        if (!$doctor) {
            $doctor = Doctor::create([
                'name' => 'Dr. Default',
                'specialty_id' => 1,
            ]);
        }

        $patients = [
            [
                'name' => 'John Doe',
                'email' => 'john@example.com',
                'phone' => '1234567890',
                'dob' => '1985-06-15',
                'gender' => 'male',
                'allergies' => ['Peanuts', 'Penicillin'],
                'medications' => ['Lisinopril'],
                'conditions' => ['Hypertension'],
                'blood_type' => 'O+',
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'jane@example.com',
                'phone' => '0987654321',
                'dob' => '1990-02-20',
                'gender' => 'female',
                'allergies' => [],
                'medications' => ['Metformin'],
                'conditions' => ['Diabetes Type 2'],
                'blood_type' => 'A-',
            ],
        ];

        foreach ($patients as $p) {
            $patient = Patient::firstOrCreate(['email' => $p['email']], $p);

            // Create some appointments for this patient
            if ($patient->appointments()->count() === 0) {
                Appointment::create([
                    'patient_id' => $patient->id,
                    'patient_name' => $patient->name,
                    'doctor_id' => $doctor->id,
                    'scheduled_at' => now()->addDays(rand(1, 10)),
                    'status' => 'confirmed',
                    'notes' => 'Regular checkup',
                ]);

                Appointment::create([
                    'patient_id' => $patient->id,
                    'patient_name' => $patient->name,
                    'doctor_id' => $doctor->id,
                    'scheduled_at' => now()->subDays(rand(1, 30)),
                    'status' => 'completed',
                    'notes' => 'Initial consultation',
                ]);
            }
        }
    }
}
