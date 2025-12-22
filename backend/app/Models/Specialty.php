<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Specialty extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'icon_path',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    protected $appends = [
        'icon_url',
    ];

    public function getIconUrlAttribute(): ?string
    {
        $path = (string) ($this->icon_path ?? '');
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
            } catch (\Exception $e) {
                // log error?
            }
        }
        return null;
    }

    public function doctors()
    {
        return $this->belongsToMany(Doctor::class, 'doctor_specialty');
    }
}
