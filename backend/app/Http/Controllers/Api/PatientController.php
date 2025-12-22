<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use App\Models\Appointment;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function index(Request $request)
    {
        $query = Patient::query()->orderBy('name');

        if ($search = $request->string('q')->toString()) {
            $query->where(function ($w) use ($search) {
                $w->where('name', 'like', "%$search%")
                  ->orWhere('email', 'like', "%$search%")
                  ->orWhere('phone', 'like', "%$search%");
            });
        }

        return response()->json($query->paginate((int) $request->get('per_page', 20)));
    }

    public function show(Patient $patient)
    {
        $patient->load('appointments');
        return response()->json($patient);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'dob' => ['nullable', 'date'],
            'gender' => ['nullable', 'in:male,female,other'],
            'address' => ['nullable', 'string', 'max:255'],
            'emergency_contact' => ['nullable', 'string', 'max:255'],
            'notes' => ['nullable', 'string'],
            'allergies' => ['nullable', 'array'],
            'medications' => ['nullable', 'array'],
            'conditions' => ['nullable', 'array'],
            'blood_type' => ['nullable', 'string', 'max:3'],
            'insurance_provider' => ['nullable', 'string', 'max:255'],
            'insurance_number' => ['nullable', 'string', 'max:255'],
        ]);

        $patient = Patient::create($data);
        return response()->json($patient, 201);
    }

    public function update(Request $request, Patient $patient)
    {
        $data = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'email' => ['sometimes', 'nullable', 'email', 'max:255'],
            'phone' => ['sometimes', 'nullable', 'string', 'max:50'],
            'dob' => ['sometimes', 'nullable', 'date'],
            'gender' => ['sometimes', 'nullable', 'in:male,female,other'],
            'address' => ['sometimes', 'nullable', 'string', 'max:255'],
            'emergency_contact' => ['sometimes', 'nullable', 'string', 'max:255'],
            'notes' => ['nullable', 'string'],
            'allergies' => ['sometimes', 'nullable', 'array'],
            'medications' => ['sometimes', 'nullable', 'array'],
            'conditions' => ['sometimes', 'nullable', 'array'],
            'blood_type' => ['sometimes', 'nullable', 'string', 'max:3'],
            'insurance_provider' => ['sometimes', 'nullable', 'string', 'max:255'],
            'insurance_number' => ['sometimes', 'nullable', 'string', 'max:255'],
        ]);

        $patient->update($data);
        return response()->json($patient);
    }

    public function destroy(Patient $patient)
    {
        $patient->delete();
        return response()->noContent();
    }

    public function appointments(Request $request, Patient $patient)
    {
        $query = Appointment::query()
            ->where('patient_id', $patient->id)
            ->orderByDesc('scheduled_at');

        if ($status = $request->string('status')->toString()) {
            $query->where('status', $status);
        }
        if ($request->boolean('upcoming')) {
            $query->where('scheduled_at', '>=', now());
        }

        return response()->json($query->paginate((int) $request->get('per_page', 10)));
    }

    public function storeAppointment(Request $request, Patient $patient)
    {
        $data = $request->validate([
            'doctor_id' => ['required', 'integer', 'exists:doctors,id'],
            'scheduled_at' => ['required', 'date', 'after:now'],
            'status' => ['nullable', 'in:pending,confirmed,cancelled,completed'],
            'notes' => ['nullable', 'string'],
        ]);

        $data['status'] = $data['status'] ?? 'pending';
        $data['scheduled_at'] = \Carbon\Carbon::parse($data['scheduled_at'])->format('Y-m-d H:i:s');
        $data['patient_id'] = $patient->id;
        $data['patient_name'] = $patient->name;

        $appointment = Appointment::create($data);
        return response()->json($appointment, 201);
    }

    public function exportAppointments(Patient $patient)
    {
        $filename = 'patient_' . $patient->id . '_appointments.csv';
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ];

        $callback = function () use ($patient) {
            $out = fopen('php://output', 'w');
            fputcsv($out, ['ID', 'Doctor', 'Scheduled At', 'Status', 'Notes']);
            \App\Models\Appointment::where('patient_id', $patient->id)
                ->orderByDesc('scheduled_at')
                ->chunk(200, function ($chunk) use ($out) {
                    foreach ($chunk as $appt) {
                        fputcsv($out, [
                            $appt->id,
                            optional($appt->doctor)->name,
                            $appt->scheduled_at,
                            $appt->status,
                            $appt->notes,
                        ]);
                    }
                });
            fclose($out);
        };

        return response()->streamDownload($callback, $filename, $headers);
    }
}
