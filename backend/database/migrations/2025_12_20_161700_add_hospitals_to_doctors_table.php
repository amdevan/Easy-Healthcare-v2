<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('doctors', function (Blueprint $table) {
            $table->json('hospitals')->nullable()->after('hospital_name');
        });

        // Migrate existing hospital_name to hospitals array
        DB::statement("UPDATE doctors SET hospitals = JSON_ARRAY(hospital_name) WHERE hospital_name IS NOT NULL AND hospital_name != ''");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('doctors', function (Blueprint $table) {
            $table->dropColumn('hospitals');
        });
    }
};
