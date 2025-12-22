<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\File as FileRule;

class MediaController extends Controller
{
    public function index(Request $request)
    {
        $query = Media::query()->orderByDesc('created_at');

        if ($request->boolean('active')) {
            $query->where('is_active', true);
        }
        if ($search = $request->string('q')->toString()) {
            $query->where('alt_text', 'like', "%{$search}%");
        }

        return response()->json($query->paginate(12));
    }

    public function show(Media $media)
    {
        return response()->json($media);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'file' => ['required', FileRule::image()->max(10 * 1024)],
            'alt_text' => ['nullable', 'string', 'max:255'],
            'caption' => ['nullable', 'string', 'max:1000'],
            'is_active' => ['nullable', 'boolean'],
            'disk' => ['nullable', 'string'],
        ]);

        $disk = $validated['disk'] ?? 'public';
        $path = $request->file('file')->store('media', ['disk' => $disk, 'visibility' => 'public']);

        $media = Media::create([
            'file_path' => $path,
            'disk' => $disk,
            'alt_text' => $validated['alt_text'] ?? null,
            'caption' => $validated['caption'] ?? null,
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return response()->json($media, 201);
    }

    public function update(Request $request, Media $media)
    {
        $validated = $request->validate([
            'file' => ['nullable', FileRule::image()->max(10 * 1024)],
            'alt_text' => ['nullable', 'string', 'max:255'],
            'caption' => ['nullable', 'string', 'max:1000'],
            'is_active' => ['nullable', 'boolean'],
            'disk' => ['nullable', 'string'],
        ]);

        if ($request->hasFile('file')) {
            // Delete old file if present
            if ($media->file_path) {
                Storage::disk($media->disk ?? 'public')->delete($media->file_path);
            }
            $disk = $validated['disk'] ?? ($media->disk ?? 'public');
            $path = $request->file('file')->store('media', ['disk' => $disk, 'visibility' => 'public']);
            $media->file_path = $path;
            $media->disk = $disk;
        }

        if (array_key_exists('alt_text', $validated)) {
            $media->alt_text = $validated['alt_text'];
        }
        if (array_key_exists('caption', $validated)) {
            $media->caption = $validated['caption'];
        }
        if (array_key_exists('is_active', $validated)) {
            $media->is_active = (bool) $validated['is_active'];
        }

        $media->save();

        return response()->json($media);
    }

    public function destroy(Media $media)
    {
        if ($media->file_path) {
            Storage::disk($media->disk ?? 'public')->delete($media->file_path);
        }
        $media->delete();
        return response()->json(['status' => 'deleted']);
    }
}