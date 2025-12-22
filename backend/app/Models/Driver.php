<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'license_number',
        'phone',
        'email',
        'status',
        'notes',
    ];

    public function nemtRequests()
    {
        return $this->hasMany(NemtRequest::class);
    }
}
