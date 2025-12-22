<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LabTest extends Model
{
    protected $fillable = [
        'name',
        'code',
        'description',
        'price',
        'duration_minutes',
        'home_collection_available',
    ];
}
