<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('patients', function (Blueprint $table) {
            $table->json('allergies')->nullable();
            $table->json('medications')->nullable();
            $table->json('conditions')->nullable();
            $table->string('blood_type')->nullable();
            $table->string('insurance_provider')->nullable();
            $table->string('insurance_number')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('patients', function (Blueprint $table) {
            $table->dropColumn(['allergies', 'medications', 'conditions', 'blood_type', 'insurance_provider', 'insurance_number']);
        });
    }
};

