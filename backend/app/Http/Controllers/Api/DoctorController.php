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

        // Filter by location using partial matching when provided
        if ($request->filled('location')) {
            $loc = $request->string('location')->toString();
            $query->where('location', 'like', "%$loc%");
        }

        // Support text search via `q` across common doctor fields
        if ($request->filled('q')) {
            $q = $request->string('q')->toString();
            $query->where(function ($w) use ($q) {
                $w->where('name', 'like', "%$q%")
                  ->orWhere('specialization', 'like', "%$q%")
                  ->orWhere('hospital_name', 'like', "%$q%")
                  ->orWhereRaw('LOWER(hospitals) LIKE ?', ['%'.strtolower($q).'%'])
                  ->orWhere('location', 'like', "%$q%");
            });
        }

        return response()->json($query->orderBy('name')->paginate(20));
    }

    public function show(Doctor $doctor)
    {
        return response()->json($doctor);
    }

    public function availability(Request $request, Doctor $doctor)
    {
        $date = $request->string('date')->toString() ?: now()->format('Y-m-d');
        $availability = $doctor->availability ?? [];

        $slots = [];
        if (is_array($availability)) {
            $keys = array_keys($availability);
            $isList = $keys === range(0, count($keys) - 1);
            if ($isList) {
                // If list of strings, use as-is. If list of day/start/end rows, expand to times for requested weekday.
                if (!empty($availability) && is_string($availability[0])) {
                    $slots = $availability;
                } elseif (!empty($availability) && is_array($availability[0])) {
                    $weekday = strtolower(\Carbon\Carbon::parse($date)->format('l'));
                    $expanded = [];
                    foreach ($availability as $row) {
                        $rowDay = strtolower($row['day'] ?? '');
                        $start = $row['start'] ?? null;
                        $end = $row['end'] ?? null;
                        if ($rowDay === $weekday && $start && $end) {
                            try {
                                $cur = \Carbon\Carbon::parse($date . ' ' . $start);
                                $endAt = \Carbon\Carbon::parse($date . ' ' . $end);
                                while ($cur <= $endAt) {
                                    $expanded[] = $cur->format('H:i');
                                    $cur->addMinutes(30);
                                }
                            } catch (\Exception $e) {
                                // ignore row
                            }
                        }
                    }
                    $slots = array_values(array_unique($expanded));
                }
            } else {
                $weekday = strtolower(\Carbon\Carbon::parse($date)->format('l')); // e.g., 'monday'
                $slots = $availability[$date] ?? $availability[$weekday] ?? ($availability['daily'] ?? []);
            }
        }

        // Do not fallback to default slots; return empty when no availability.

        return response()->json([
            'date' => $date,
            'slots' => array_values($slots),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'position' => ['nullable', 'string', 'max:255'],
            'specialization' => ['nullable', 'string', 'max:255'],
            'appointment_type' => ['nullable', 'array'],
            'nmc_no' => ['nullable', 'string', 'max:255'],
            'hospital_name' => ['nullable', 'string', 'max:255'],
            'hospitals' => ['nullable', 'array'],
            'location' => ['nullable', 'string', 'max:255'],
            'experience_years' => ['nullable', 'integer', 'min:0'],
            'content' => ['nullable', 'string'],
            'availability' => ['nullable', 'array'],
            'profile_photo_path' => ['nullable', 'string', 'max:255'],
            'is_active' => ['nullable', 'boolean'],
            'specialty_id' => ['nullable', 'integer', 'exists:specialties,id'],
        ]);

        $doctor = Doctor::create($data);

        return response()->json($doctor, 201);
    }

    public function update(Request $request, Doctor $doctor)
    {
        $data = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'position' => ['sometimes', 'nullable', 'string', 'max:255'],
            'specialization' => ['sometimes', 'nullable', 'string', 'max:255'],
            'appointment_type' => ['sometimes', 'nullable', 'array'],
            'nmc_no' => ['sometimes', 'nullable', 'string', 'max:255'],
            'hospital_name' => ['sometimes', 'nullable', 'string', 'max:255'],
            'hospitals' => ['sometimes', 'nullable', 'array'],
            'location' => ['sometimes', 'nullable', 'string', 'max:255'],
            'experience_years' => ['sometimes', 'nullable', 'integer', 'min:0'],
            'content' => ['sometimes', 'nullable', 'string'],
            'availability' => ['sometimes', 'nullable', 'array'],
            'profile_photo_path' => ['sometimes', 'nullable', 'string', 'max:255'],
            'is_active' => ['sometimes', 'nullable', 'boolean'],
            'specialty_id' => ['sometimes', 'nullable', 'integer', 'exists:specialties,id'],
        ]);

        $doctor->update($data);

        return response()->json($doctor);
    }

    public function showBySlug(string $slug)
    {
        $norm = function ($s) {
            $s = strtolower(trim($s));
            $s = preg_replace('/[^a-z0-9\s-]/', '', $s);
            $s = preg_replace('/\s+/', '-', $s);
            $s = preg_replace('/-+/', '-', $s);
            return $s;
        };
        $doctor = Doctor::query()->get()->first(function ($d) use ($slug, $norm) {
            return $norm($d->name) === $slug;
        });
        if (!$doctor) {
            return response()->json(['message' => 'Not found'], 404);
        }
        return response()->json($doctor);
    }
}
