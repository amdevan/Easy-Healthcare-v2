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
        Schema::table('appointments', function (Blueprint $table) {
            $table->string('payment_method')->nullable()->after('notes'); // e.g., clinic, esewa, khalti
            $table->string('payment_status')->default('pending')->after('payment_method'); // pending, paid, failed
            $table->decimal('payment_amount', 10, 2)->nullable()->after('payment_status');
            $table->string('transaction_id')->nullable()->after('payment_amount');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('appointments', function (Blueprint $table) {
            $table->dropColumn(['payment_method', 'payment_status', 'payment_amount', 'transaction_id']);
        });
    }
};
