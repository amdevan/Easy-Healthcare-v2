<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Appointment extends Model
{
    protected $fillable = [
        'patient_name',
        'patient_id',
        'doctor_id',
        'scheduled_at',
        'status',
        'notes',
        'phone',
        'appointment_type',
        'payment_method',
        'payment_status',
        'payment_amount',
        'transaction_id',
    ];

    public function doctor(): BelongsTo
    {
        return $this->belongsTo(Doctor::class);
    }

    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }
}
