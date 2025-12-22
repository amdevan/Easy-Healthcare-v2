<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Patient extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'dob',
        'gender',
        'address',
        'emergency_contact',
        'notes',
        'allergies',
        'medications',
        'conditions',
        'blood_type',
        'insurance_provider',
        'insurance_number',
        'documents',
    ];

    protected $casts = [
        'dob' => 'date',
        'allergies' => 'array',
        'medications' => 'array',
        'conditions' => 'array',
        'documents' => 'array',
    ];

    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class);
    }

    public function prescriptions(): HasMany
    {
        return $this->hasMany(Prescription::class);
    }

    public function labAppointments(): HasMany
    {
        return $this->hasMany(LabAppointment::class);
    }

    public function nemtRequests(): HasMany
    {
        return $this->hasMany(NemtRequest::class);
    }

    public function memberships(): HasMany
    {
        return $this->hasMany(Membership::class);
    }

    public function packageRequests(): HasMany
    {
        return $this->hasMany(PackageRequest::class);
    }
}
