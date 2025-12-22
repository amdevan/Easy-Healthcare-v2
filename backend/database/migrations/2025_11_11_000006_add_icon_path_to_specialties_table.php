<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('specialties', 'icon_path')) {
            Schema::table('specialties', function (Blueprint $table) {
                $table->string('icon_path')->nullable()->after('slug');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('specialties', 'icon_path')) {
            Schema::table('specialties', function (Blueprint $table) {
                $table->dropColumn('icon_path');
            });
        }
    }
};