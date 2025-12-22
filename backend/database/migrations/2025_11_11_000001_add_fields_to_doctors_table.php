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
            $table->string('position')->nullable()->after('name');
            $table->string('specialization')->nullable()->after('position');
            $table->text('content')->nullable()->after('specialization');
            $table->json('availability')->nullable()->after('content');
            $table->string('hospital_name')->nullable()->after('availability');
            $table->boolean('is_active')->default(true)->after('hospital_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('doctors', function (Blueprint $table) {
            $table->dropColumn(['position', 'specialization', 'content', 'availability', 'hospital_name', 'is_active']);
        });
    }
};