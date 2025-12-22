<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Patient;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function index()
    {
        $query = Appointment::query()->orderByDesc('scheduled_at');

        if ($doctorId = request('doctor_id')) {
            $query->where('doctor_id', $doctorId);
        }
        if ($patientId = request('patient_id')) {
            $query->where('patient_id', $patientId);
        }
        if ($status = request('status')) {
            $query->where('status', $status);
        }

        return response()->json($query->paginate(10));
    }

    public function show(Appointment $appointment)
    {
        return response()->json($appointment);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'patient_id' => ['nullable', 'integer', 'exists:patients,id', 'required_without:patient_name'],
            'patient_name' => ['nullable', 'string', 'max:255', 'required_without:patient_id'],
            'doctor_id' => ['required', 'integer', 'exists:doctors,id'],
            'scheduled_at' => ['required', 'date', 'after:now'],
            'status' => ['nullable', 'in:pending,confirmed,cancelled,completed'],
            'notes' => ['nullable', 'string'],
            'phone' => ['nullable', 'string', 'max:255'],
            'appointment_type' => ['nullable', 'string'],
            'payment_method' => ['nullable', 'string'],
            'payment_status' => ['nullable', 'string', 'in:pending,paid,failed'],
            'payment_amount' => ['nullable', 'numeric'],
            'transaction_id' => ['nullable', 'string'],
        ]);

        $data['status'] = $data['status'] ?? 'pending';
        $data['scheduled_at'] = \Carbon\Carbon::parse($data['scheduled_at'])->format('Y-m-d H:i:s');

        if (empty($data['patient_id']) && !empty($data['patient_name'])) {
            $patient = Patient::firstOrCreate(['name' => $data['patient_name']]);
            $data['patient_id'] = $patient->id;
        } elseif (!empty($data['patient_id']) && empty($data['patient_name'])) {
            $data['patient_name'] = optional(Patient::find($data['patient_id']))->name;
        }

        $appointment = Appointment::create($data);
        return response()->json($appointment, 201);
    }

    public function update(Request $request, Appointment $appointment)
    {
        $data = $request->validate([
            'patient_id' => ['sometimes', 'nullable', 'integer', 'exists:patients,id'],
            'patient_name' => ['sometimes', 'nullable', 'string', 'max:255'],
            'doctor_id' => ['sometimes', 'required', 'integer', 'exists:doctors,id'],
            'scheduled_at' => ['sometimes', 'required', 'date', 'after:now'],
            'status' => ['sometimes', 'required', 'in:pending,confirmed,cancelled,completed'],
            'notes' => ['nullable', 'string'],
            'phone' => ['nullable', 'string', 'max:255'],
            'appointment_type' => ['nullable', 'string'],
        ]);

        if (isset($data['scheduled_at'])) {
            $data['scheduled_at'] = \Carbon\Carbon::parse($data['scheduled_at'])->format('Y-m-d H:i:s');
        }
        if (array_key_exists('patient_id', $data) && empty($data['patient_name'])) {
            $data['patient_name'] = optional(Patient::find($data['patient_id']))->name;
        }
        if (array_key_exists('patient_name', $data) && empty($data['patient_id']) && !empty($data['patient_name'])) {
            $patient = Patient::firstOrCreate(['name' => $data['patient_name']]);
            $data['patient_id'] = $patient->id;
        }

        $appointment->update($data);
        return response()->json($appointment);
    }
}
