<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Specialty;
use App\Models\Banner;
use App\Models\BoardMember;
use Illuminate\Support\Facades\Storage;

echo "Checking Specialties...\n";
foreach (Specialty::all() as $s) {
    echo "ID: {$s->id}, Name: {$s->name}, Icon Path: {$s->icon_path}\n";
    if ($s->icon_path) {
        $public = Storage::disk('public')->exists($s->icon_path);
        $local = Storage::disk('local')->exists($s->icon_path);
        echo "  - Public Disk: " . ($public ? 'EXISTS' : 'MISSING') . "\n";
        echo "  - Local Disk: " . ($local ? 'EXISTS' : 'MISSING') . "\n";
        echo "  - Accessor URL: " . $s->icon_url . "\n";
    }
}

echo "\nChecking Banners...\n";
foreach (Banner::all() as $b) {
    echo "ID: {$b->id}, Title: {$b->title}, Image: {$b->image}, Image URL: {$b->image_url}\n";
    if ($b->image) {
        $public = Storage::disk('public')->exists($b->image);
        $local = Storage::disk('local')->exists($b->image);
        echo "  - Public Disk: " . ($public ? 'EXISTS' : 'MISSING') . "\n";
        echo "  - Local Disk: " . ($local ? 'EXISTS' : 'MISSING') . "\n";
        echo "  - Accessor URL: " . $b->display_image_url . "\n";
    }
}

echo "\nChecking Board Members (Reference)...\n";
foreach (BoardMember::take(3)->get() as $m) {
    echo "ID: {$m->id}, Name: {$m->name}, Photo Path: {$m->photo_path}\n";
    if ($m->photo_path) {
        $public = Storage::disk('public')->exists($m->photo_path);
        echo "  - Public Disk: " . ($public ? 'EXISTS' : 'MISSING') . "\n";
        echo "  - Accessor URL: " . $m->photo_url . "\n";
    }
}
