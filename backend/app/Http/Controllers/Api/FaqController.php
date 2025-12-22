<?php

namespace App\Http\Controllers\Api;

use App\Models\Faq;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;

class FaqController extends Controller
{
    public function index(Request $request)
    {
        $faqs = Faq::query()
            ->where('is_active', true)
            ->orderBy('order')
            ->orderBy('id')
            ->get();

        return response()->json($faqs);
    }
}