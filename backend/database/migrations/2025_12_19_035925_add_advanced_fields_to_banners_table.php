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
        Schema::table('banners', function (Blueprint $table) {
            $table->string('button_text')->nullable()->after('link_url');
            $table->string('image')->nullable()->after('subtitle'); // For file upload
            $table->json('pages')->nullable()->after('is_active'); // Array of page routes/slugs
            $table->boolean('show_on_all_pages')->default(true)->after('pages');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('banners', function (Blueprint $table) {
            $table->dropColumn(['button_text', 'image', 'pages', 'show_on_all_pages']);
        });
    }
};
