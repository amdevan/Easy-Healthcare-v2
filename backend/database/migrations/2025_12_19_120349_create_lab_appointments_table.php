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
        Schema::create('lab_appointments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained()->cascadeOnDelete();
            $table->foreignId('lab_test_id')->nullable()->constrained()->nullOnDelete();
            $table->string('test_name')->nullable(); // For ad-hoc tests
            $table->dateTime('scheduled_at');
            $table->string('status')->default('pending');
            $table->boolean('home_collection')->default(false);
            $table->string('address')->nullable();
            $table->text('notes')->nullable();
            $table->string('report_file')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lab_appointments');
    }
};
