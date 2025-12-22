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
            if (!Schema::hasColumn('memberships', 'start_date')) {
                $table->date('start_date')->nullable()->after('plan_type');
            }
            if (!Schema::hasColumn('memberships', 'end_date')) {
                $table->date('end_date')->nullable()->after('start_date');
            }
            if (!Schema::hasColumn('memberships', 'notes')) {
                $table->text('notes')->nullable()->after('status');
            }
            if (Schema::hasColumn('memberships', 'join_date')) {
                $table->dropColumn('join_date');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('memberships', function (Blueprint $table) {
            if (Schema::hasColumn('memberships', 'start_date')) {
                $table->dropColumn('start_date');
            }
            if (Schema::hasColumn('memberships', 'end_date')) {
                $table->dropColumn('end_date');
            }
            if (Schema::hasColumn('memberships', 'notes')) {
                $table->dropColumn('notes');
            }
            if (!Schema::hasColumn('memberships', 'join_date')) {
                $table->date('join_date')->nullable();
            }
        });
    }
};
