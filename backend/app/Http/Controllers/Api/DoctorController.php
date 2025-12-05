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

        // Filter by exact location when provided
        if ($request->filled('location')) {
            $query->where('location', $request->string('location'));
        }

        // Support text search via `q` across common doctor fields
        if ($request->filled('q')) {
            $q = $request->string('q')->toString();
            $query->where(function ($w) use ($q) {
                $w->where('name', 'like', "%$q%")
                  ->orWhere('specialization', 'like', "%$q%")
                  ->orWhere('hospital_name', 'like', "%$q%")
                  ->orWhere('location', 'like', "%$q%");
            });
        }

        return response()->json($query->orderBy('name')->paginate(20));
    }

    public function show(Doctor $doctor)
    {
        return response()->json($doctor);
    }
}
