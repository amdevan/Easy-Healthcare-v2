<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Appointment;
use App\Models\Prescription;
use App\Models\LabAppointment;

class PatientPanelController extends Controller
{
    public function appointments(Request $request)
    {
        $patient = $request->user()->patient;
        if (!$patient) {
            return response()->json(['message' => 'Patient profile not found'], 404);
        }

        $query = $patient->appointments()->with('doctor')->orderByDesc('scheduled_at');
        
        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        return response()->json($query->paginate(20));
    }

    public function storeAppointment(Request $request)
    {
        $patient = $request->user()->patient;
        if (!$patient) {
            return response()->json(['message' => 'Patient profile not found'], 404);
        }

        $data = $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'scheduled_at' => 'required|date|after:now',
            'notes' => 'nullable|string',
        ]);

        $appointment = $patient->appointments()->create([
            'doctor_id' => $data['doctor_id'],
            'scheduled_at' => $data['scheduled_at'],
            'status' => 'pending',
            'notes' => $data['notes'] ?? null,
            'patient_name' => $patient->name,
        ]);

        return response()->json($appointment, 201);
    }
    
    public function cancelAppointment(Request $request, $id)
    {
        $patient = $request->user()->patient;
        if (!$patient) {
            return response()->json(['message' => 'Patient profile not found'], 404);
        }
        
        $appointment = $patient->appointments()->findOrFail($id);
        
        if ($appointment->status === 'completed') {
             return response()->json(['message' => 'Cannot cancel completed appointment'], 400);
        }

        $appointment->update(['status' => 'cancelled']);
        return response()->json($appointment);
    }

    public function prescriptions(Request $request)
    {
        $patient = $request->user()->patient;
        if (!$patient) {
            return response()->json(['message' => 'Patient profile not found'], 404);
        }
        
        return response()->json($patient->prescriptions()->with('doctor')->latest()->paginate(20));
    }

    public function labAppointments(Request $request)
    {
        $patient = $request->user()->patient;
        if (!$patient) {
            return response()->json(['message' => 'Patient profile not found'], 404);
        }
        
        return response()->json($patient->labAppointments()->with('labTest')->latest()->paginate(20));
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();
        $patient = $user->patient;

        if (!$patient) {
             return response()->json(['message' => 'Patient profile not found'], 404);
        }

        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'phone' => 'sometimes|nullable|string|max:20',
            'address' => 'sometimes|nullable|string|max:255',
            'dob' => 'sometimes|nullable|date',
            'gender' => 'sometimes|nullable|in:male,female,other',
            'blood_type' => 'sometimes|nullable|string|max:5',
        ]);

        if (isset($data['name'])) {
            $user->update(['name' => $data['name']]);
        }

        $patient->update($data);

        return response()->json(['user' => $user->fresh(), 'patient' => $patient->fresh()]);
    }
}
