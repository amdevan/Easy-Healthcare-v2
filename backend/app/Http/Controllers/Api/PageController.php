<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UiSetting;

class PageController extends Controller
{
    /**
     * Map incoming slugs to canonical slugs.
     */
    private function canonicalSlug(string $slug): string
    {
        $map = [
            'products' => 'health-package',
        ];
        return $map[$slug] ?? $slug;
    }

    /**
     * List all pages (keys beginning with 'page.').
     */
    public function index(Request $request)
    {
        $items = UiSetting::query()
            ->where('key', 'like', 'page.%')
            ->get()
            ->map(function ($s) {
                $slug = substr($s->key, strlen('page.'));
                return [
                    'slug' => $slug,
                    'data' => $s->value ?? [],
                ];
            });

        return response()->json($items);
    }

    /**
     * Get a single page by slug.
     */
    public function show(string $slug)
    {
        $slug = $this->canonicalSlug($slug);
        $key = 'page.' . $slug;
        $setting = UiSetting::query()->where('key', $key)->first();
        if (! $setting) {
            return response()->json(['error' => 'Page not found'], 404);
        }
        return response()->json($setting->value ?? []);
    }

    /**
     * Create a page document (fails if exists).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'slug' => ['required', 'string', 'max:255'],
            'data' => ['nullable', 'array'],
        ]);

        $slug = $this->canonicalSlug($validated['slug']);
        $key = 'page.' . $slug;
        $existing = UiSetting::query()->where('key', $key)->first();
        if ($existing) {
            return response()->json(['error' => 'Page already exists'], 422);
        }

        $setting = UiSetting::create([
            'key' => $key,
            'value' => $validated['data'] ?? [],
        ]);

        return response()->json(['slug' => $slug, 'data' => $setting->value], 201);
    }

    /**
     * Replace a page document.
     */
    public function update(Request $request, string $slug)
    {
        $validated = $request->validate([
            'data' => ['required', 'array'],
        ]);

        $slug = $this->canonicalSlug($slug);
        $key = 'page.' . $slug;
        $setting = UiSetting::query()->firstOrCreate(['key' => $key], ['value' => []]);
        $setting->value = $validated['data'];
        $setting->save();

        return response()->json(['slug' => $slug, 'data' => $setting->value]);
    }

    /**
     * Patch a page document (deep merge).
     */
    public function patch(Request $request, string $slug)
    {
        $validated = $request->validate([
            'data' => ['required', 'array'],
        ]);

        $slug = $this->canonicalSlug($slug);
        $key = 'page.' . $slug;
        $setting = UiSetting::query()->firstOrCreate(['key' => $key], ['value' => []]);
        $merged = array_replace_recursive($setting->value ?? [], $validated['data']);
        $setting->value = $merged;
        $setting->save();

        return response()->json(['slug' => $slug, 'data' => $setting->value]);
    }

    /**
     * Delete a page document.
     */
    public function destroy(string $slug)
    {
        $slug = $this->canonicalSlug($slug);
        $key = 'page.' . $slug;
        $setting = UiSetting::query()->where('key', $key)->first();
        if (! $setting) {
            return response()->json(['status' => 'not_found'], 404);
        }
        $setting->delete();
        return response()->json(['status' => 'deleted']);
    }
}
