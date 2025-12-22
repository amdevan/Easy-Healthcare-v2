<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Doctor extends Model
{
    protected $fillable = [
        'name',
        'location',
        'experience_years',
        'rating',
        'nmc_no',
        'profile_photo_path',
        'position',
        'specialization',
        'appointment_type',
        'consultation_fee_clinic',
        'consultation_fee_online',
        'consultation_fee_home',
        'specialty_id',
        'content',
        'availability',
        'hospital_name',
        'hospitals',
        'is_active',
    ];

    protected $casts = [
        'availability' => 'array',
        'appointment_type' => 'array',
        'hospitals' => 'array',
        'is_active' => 'boolean',
    ];

    protected $appends = ['profile_photo_url'];

    public function getProfilePhotoUrlAttribute()
    {
        $path = $this->profile_photo_path;
        if (!$path) {
            return 'https://i.pravatar.cc/150?u=' . $this->id;
        }
        if (filter_var($path, FILTER_VALIDATE_URL)) {
            return $path;
        }
        return Storage::disk('public')->url($path);
    }

    public function specialty()
    {
        return $this->belongsTo(Specialty::class);
    }

    public function specialties()
    {
        return $this->belongsToMany(Specialty::class, 'doctor_specialty');
    }
}
