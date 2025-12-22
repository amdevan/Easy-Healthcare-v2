<?php

namespace App\Http\Controllers\Api;

use App\Models\Banner;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;

class BannerController extends Controller
{
    public function index(Request $request)
    {
        $banners = Banner::query()
            ->where('is_active', true)
            ->orderBy('order')
            ->orderBy('id')
            ->get();

        return response()->json($banners);
    }
}