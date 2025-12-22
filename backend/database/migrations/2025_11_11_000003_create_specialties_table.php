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
        if (!Schema::hasTable('specialties')) {
            Schema::create('specialties', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('slug')->unique();
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }

        if (!Schema::hasColumn('doctors', 'specialty_id')) {
            Schema::table('doctors', function (Blueprint $table) {
                $table->foreignId('specialty_id')->nullable()->after('specialization')->constrained('specialties')->nullOnDelete();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('doctors', 'specialty_id')) {
            Schema::table('doctors', function (Blueprint $table) {
                $table->dropConstrainedForeignId('specialty_id');
            });
        }

        Schema::dropIfExists('specialties');
    }
};