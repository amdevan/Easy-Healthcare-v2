<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    protected $fillable = [
        'name',
        'profile_photo_path',
        'position',
        'specialization',
        'specialty_id',
        'content',
        'availability',
        'hospital_name',
        'is_active',
    ];

    protected $casts = [
        'availability' => 'array',
        'is_active' => 'boolean',
    ];

    public function specialty()
    {
        return $this->belongsTo(Specialty::class);
    }

    public function specialties()
    {
        return $this->belongsToMany(Specialty::class, 'doctor_specialty');
    }
}
