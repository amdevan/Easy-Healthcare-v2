<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    use HasFactory;

    protected $fillable = [
        'file_path',
        'disk',
        'alt_text',
        'caption',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}