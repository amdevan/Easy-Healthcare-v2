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

    public function doctors()
    {
        return $this->belongsToMany(Doctor::class, 'doctor_specialty');
    }
}
