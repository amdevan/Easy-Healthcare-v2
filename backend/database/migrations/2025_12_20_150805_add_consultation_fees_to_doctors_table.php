<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('doctors', function (Blueprint $table) {
            $table->unsignedInteger('consultation_fee_clinic')->nullable()->after('appointment_type');
            $table->unsignedInteger('consultation_fee_online')->nullable()->after('consultation_fee_clinic');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('doctors', function (Blueprint $table) {
            $table->dropColumn(['consultation_fee_clinic', 'consultation_fee_online']);
        });
    }
};
