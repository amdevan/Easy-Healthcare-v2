<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LabTest;
use Illuminate\Http\Request;

class LabTestController extends Controller
{
    public function index(Request $request)
    {
        $query = LabTest::query();
        if ($request->filled('q')) {
            $q = $request->string('q')->toString();
            $query->where(function ($w) use ($q) {
                $w->where('name', 'like', "%$q%")
                  ->orWhere('code', 'like', "%$q%")
                  ->orWhere('description', 'like', "%$q%");
            });
        }
        return response()->json($query->orderBy('name')->paginate(20));
    }

    public function show(LabTest $labTest)
    {
        return response()->json($labTest);
    }
}