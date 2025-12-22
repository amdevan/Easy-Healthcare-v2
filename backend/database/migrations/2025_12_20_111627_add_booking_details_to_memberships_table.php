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
        Schema::table('memberships', function (Blueprint $table) {
            $table->string('booking_name')->nullable()->after('id');
            $table->string('booking_email')->nullable()->after('booking_name');
            $table->string('booking_phone')->nullable()->after('booking_email');
            $table->string('relation')->nullable()->after('booking_phone'); // 'self', 'parent', 'child', 'spouse', 'other'
            $table->boolean('is_for_self')->default(true)->after('relation');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('memberships', function (Blueprint $table) {
            $table->dropColumn(['booking_name', 'booking_email', 'booking_phone', 'relation', 'is_for_self']);
        });
    }
};
