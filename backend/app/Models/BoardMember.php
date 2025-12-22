<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BoardMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'role',
        'photo_path',
        'bio',
        'email',
        'phone',
        'links',
        'order',
        'is_active',
    ];

    protected $casts = [
        'links' => 'array',
        'is_active' => 'boolean',
    ];

    protected $appends = [
        'photo_url',
    ];

    public function getPhotoUrlAttribute(): ?string
    {
        $path = (string) ($this->photo_path ?? '');
        if ($path === '') {
            return null;
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
            } catch (\Throwable $e) {
                return null;
            }
        }
        return null;
    }
}
