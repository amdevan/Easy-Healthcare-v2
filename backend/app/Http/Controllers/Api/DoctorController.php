<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use Illuminate\Http\Request;

class DoctorController extends Controller
{
    public function index(Request $request)
    {
        $query = Doctor::query();
        if ($request->filled('location')) {
            $query->where('location', $request->string('location'));
        }
        return response()->json($query->orderBy('name')->paginate(20));
    }

    public function show(Doctor $doctor)
    {
        return response()->json($doctor);
    }
}