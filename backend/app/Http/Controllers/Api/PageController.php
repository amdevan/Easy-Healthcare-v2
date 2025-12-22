<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Page;

class PageController extends Controller
{
    /**
     * List all active pages.
     */
    public function index(Request $request)
    {
        $pages = Page::where('is_active', true)
            ->select(['title', 'slug', 'updated_at'])
            ->get();

        return response()->json($pages);
    }

    /**
     * Get a single page by slug.
     */
    public function show(string $slug)
    {
        $page = Page::where('slug', $slug)
            ->where('is_active', true)
            ->first();

        if (! $page) {
            return response()->json(['error' => 'Page not found'], 404);
        }

        return response()->json($page);
    }
}
