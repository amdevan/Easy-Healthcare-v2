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
        Schema::create('package_requests', function (Blueprint $table) {
            $table->id();
            $table->string('request_id')->unique();
            $table->string('patient_name');
            $table->string('package_name');
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->date('requested_date');
            $table->string('status')->default('pending'); // pending, confirmed, completed, cancelled
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('package_requests');
    }
};
