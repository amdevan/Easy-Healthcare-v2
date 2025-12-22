<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'subtitle',
        'image',
        'image_url',
        'link_url',
        'button_text',
        'pages',
        'show_on_all_pages',
        'order',
        'is_active',
    ];

    protected $casts = [
        'pages' => 'array',
        'show_on_all_pages' => 'boolean',
        'is_active' => 'boolean',
    ];
protected $appends = [
        'display_image_url',
    ];

    public function getDisplayImageUrlAttribute(): ?string
    {
        // Prefer 'image' (local path) over 'image_url' (external)
        $path = (string) ($this->image ?? '');
        
        // If no local image, return external URL if available
        if ($path === '') {
            return $this->image_url;
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }
        
        $storage = \Illuminate\Support\Facades\Storage::disk('public');
        if ($storage->exists($path)) {
            return $storage->url($path);
        }
        
        $local = \Illuminate\Support\Facades\Storage::disk('local');
        if ($local->exists($path)) {
            try {
                $storage->put($path, $local->get($path));
                return $storage->url($path);
            } catch (\Exception $e) {
                // log error?
            }
        }
        
        // Fallback to image_url if local file missing
        return $this->image_url;
    }
}