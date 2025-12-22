<?php

namespace App\Http\Controllers\Api;

use App\Models\Testimonial;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;

class TestimonialController extends Controller
{
    public function index(Request $request)
    {
        $items = Testimonial::query()
            ->where('is_active', true)
            ->orderBy('order')
            ->orderBy('id')
            ->get();

        return response()->json($items);
    }
}