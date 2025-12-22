<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'make',
        'model',
        'year',
        'license_plate',
        'vin',
        'type',
        'status',
        'notes',
    ];

    public function nemtRequests()
    {
        return $this->hasMany(NemtRequest::class);
    }
}
