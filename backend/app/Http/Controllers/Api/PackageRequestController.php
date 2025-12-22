<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PackageRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PackageRequestController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'is_for_self' => 'required|boolean',
            'package_name' => 'required|string',
            'booking_name' => 'nullable|required_if:is_for_self,false|string|max:255',
            'booking_email' => 'nullable|required_if:is_for_self,false|email|max:255',
            'booking_phone' => 'nullable|required_if:is_for_self,false|string|max:20',
            'relation' => 'nullable|required_if:is_for_self,false|string|max:255',
            'patient_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'nullable|string|max:255',
        ]);

        $packageRequest = PackageRequest::create([
            ...$validated,
            'request_id' => 'PR-' . strtoupper(Str::random(8)),
            'status' => 'pending',
            'requested_date' => now(),
        ]);

        return response()->json([
            'message' => 'Package request submitted successfully',
            'package_request' => $packageRequest,
        ], 201);
    }
}
