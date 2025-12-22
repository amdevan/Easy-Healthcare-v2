<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;

class AppointmentController extends Controller
{
    public function index()
    {
        $query = Appointment::query()->orderByDesc('scheduled_at');

        if ($doctorId = request('doctor_id')) {
            $query->where('doctor_id', $doctorId);
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
}