<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Membership;
use Illuminate\Http\Request;

class MembershipController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'is_for_self' => 'required|boolean',
            'plan_type' => 'required|string',
            'booking_name' => 'nullable|required_if:is_for_self,false|string|max:255',
            'booking_email' => 'nullable|required_if:is_for_self,false|email|max:255',
            'booking_phone' => 'nullable|required_if:is_for_self,false|string|max:20',
            'relation' => 'nullable|required_if:is_for_self,false|string|max:255',
            'name' => 'required|string|max:255', // Member name
            'email' => 'required|email|max:255', // Member email
            'phone' => 'required|string|max:20', // Member phone
            'address' => 'nullable|string|max:255', // Member address
        ]);

        $membership = Membership::create([
            ...$validated,
            'status' => 'pending',
            'start_date' => now(),
            // End date will be calculated based on plan type if needed, or set by admin
        ]);

        return response()->json([
            'message' => 'Membership request submitted successfully',
            'membership' => $membership,
        ], 201);
    }
}
