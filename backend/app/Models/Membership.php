<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Membership extends Model
{
    protected $fillable = [
        'booking_name',
        'booking_email',
        'booking_phone',
        'relation',
        'is_for_self',
        'name',
        'email',
        'phone',
        'address',
        'plan_type',
        'start_date',
        'end_date',
        'status',
        'notes',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'is_for_self' => 'boolean',
    ];
}
