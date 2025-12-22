<?php

namespace App\Http\Controllers\Api;

use App\Models\UiSetting;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;

class UiSettingController extends Controller
{
    public function index(Request $request)
    {
        $settings = UiSetting::query()->get()->mapWithKeys(function ($item) {
            return [$item->key => $item->value];
        });

        return response()->json($settings);
    }

    public function show(string $key)
    {
        $setting = UiSetting::query()->where('key', $key)->first();
        if (! $setting) {
            return response()->json(['error' => 'Setting not found'], 404);
        }
        return response()->json($setting->value);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'key' => ['required', 'string', 'max:255'],
            'value' => ['nullable', 'array'],
        ]);

        $existing = UiSetting::query()->where('key', $validated['key'])->first();
        if ($existing) {
            return response()->json(['error' => 'Key already exists'], 422);
        }

        $setting = UiSetting::create([
            'key' => $validated['key'],
            'value' => $validated['value'] ?? [],
        ]);

        return response()->json($setting, 201);
    }

    public function update(Request $request, string $key)
    {
        $validated = $request->validate([
            'value' => ['required', 'array'],
        ]);

        $setting = UiSetting::query()->firstOrCreate(['key' => $key]);
        $setting->value = $validated['value'];
        $setting->save();

        return response()->json($setting);
    }

    public function patch(Request $request, string $key)
    {
        $validated = $request->validate([
            'value' => ['required', 'array'],
        ]);

        $setting = UiSetting::query()->firstOrCreate(['key' => $key], ['value' => []]);
        $merged = array_replace_recursive($setting->value ?? [], $validated['value']);
        $setting->value = $merged;
        $setting->save();

        return response()->json($setting);
    }

    public function destroy(string $key)
    {
        $setting = UiSetting::query()->where('key', $key)->first();
        if (! $setting) {
            return response()->json(['status' => 'not_found'], 404);
        }
        $setting->delete();
        return response()->json(['status' => 'deleted']);
    }
}