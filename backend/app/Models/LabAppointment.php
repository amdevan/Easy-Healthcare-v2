<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LabAppointment extends Model
{
    protected $fillable = [
        'patient_id',
        'lab_test_id',
        'test_name',
        'scheduled_at',
        'status',
        'home_collection',
        'address',
        'notes',
        'report_file',
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
        'home_collection' => 'boolean',
    ];

    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    public function labTest(): BelongsTo
    {
        return $this->belongsTo(LabTest::class);
    }
}
