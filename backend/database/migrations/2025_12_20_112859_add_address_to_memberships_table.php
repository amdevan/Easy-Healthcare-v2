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
        if (!Schema::hasColumn('memberships', 'phone')) {
            Schema::table('memberships', function (Blueprint $table) {
                $table->string('phone')->nullable()->after('email');
            });
        }

        if (!Schema::hasColumn('memberships', 'address')) {
            Schema::table('memberships', function (Blueprint $table) {
                $table->string('address')->nullable()->after('email');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('memberships', function (Blueprint $table) {
            if (Schema::hasColumn('memberships', 'address')) {
                $table->dropColumn('address');
            }
            if (Schema::hasColumn('memberships', 'phone')) {
                $table->dropColumn('phone');
            }
        });
    }
};
