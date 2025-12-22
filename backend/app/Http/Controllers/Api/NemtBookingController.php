<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NemtRequest;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class NemtBookingController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'patientName' => 'required|string|max:255',
            'contactNumber' => 'required|string|max:20',
            'pickupLocation' => 'required|string',
            'dropoffLocation' => 'required|string',
            'date' => 'required|date',
            'time' => 'required',
            'vehicleType' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        try {
            DB::beginTransaction();

            // Find or create patient by phone number
            $patient = Patient::where('phone', $validated['contactNumber'])->first();

            if (!$patient) {
                $patient = Patient::create([
                    'name' => $validated['patientName'],
                    'phone' => $validated['contactNumber'],
                ]);
            } else {
                // Optional: Update name if provided and different? 
                // Let's keep existing name to avoid overriding with potentially less complete name,
                // or update it. For now, we assume the existing record is the source of truth,
                // but we could update if the existing name is empty.
                if (empty($patient->name)) {
                    $patient->update(['name' => $validated['patientName']]);
                }
            }

            // Combine date and time
            $scheduledAt = $validated['date'] . ' ' . $validated['time'];

            $nemtRequest = NemtRequest::create([
                'patient_id' => $patient->id,
                'pickup_address' => $validated['pickupLocation'],
                'dropoff_address' => $validated['dropoffLocation'],
                'scheduled_at' => $scheduledAt,
                'vehicle_type' => $validated['vehicleType'] ?? null,
                'notes' => $validated['notes'] ?? null,
                'status' => 'pending',
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Booking request submitted successfully',
                'data' => $nemtRequest,
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('NEMT Booking Error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to submit booking request',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
