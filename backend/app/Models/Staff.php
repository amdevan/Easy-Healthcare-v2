<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Staff extends Model
{
    protected $fillable = [
        'name',
        'role',
        'phone',
        'email',
        'status',
        'address',
        'joining_date',
        'emergency_contact_name',
        'emergency_contact_phone',
        'notes',
    ];

    protected $casts = [
        'joining_date' => 'date',
    ];

    public function nemtRequests(): BelongsToMany
    {
        return $this->belongsToMany(NemtRequest::class, 'nemt_request_staff');
    }
}
