<?php
// debug_error.php - Place this in your 'public' folder
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

echo "<h1>Laravel Debugger</h1>";

try {
    echo "<p>1. Checking Autoloader...</p>";
    if (!file_exists(__DIR__.'/../vendor/autoload.php')) {
        throw new Exception("Vendor folder missing! Did you run 'composer install'?");
    }
    require __DIR__.'/../vendor/autoload.php';
    echo "<p style='color:green'>✅ Autoloader loaded.</p>";

    echo "<p>2. Bootstrapping Application...</p>";
    if (!file_exists(__DIR__.'/../bootstrap/app.php')) {
        throw new Exception("Bootstrap file missing!");
    }
    $app = require_once __DIR__.'/../bootstrap/app.php';
    echo "<p style='color:green'>✅ App bootstrapped.</p>";

    echo "<p>3. Handling Request (Dry Run)...</p>";
    $request = Illuminate\Http\Request::capture();
    echo "<p style='color:green'>✅ Request captured.</p>";
    
    // We won't fully run the app because it might send headers, but we can check DB
    echo "<p>4. Checking Database Connection...</p>";
    try {
        \Illuminate\Support\Facades\DB::connection()->getPdo();
        echo "<p style='color:green'>✅ Database Connected successfully.</p>";
    } catch (\Exception $e) {
        echo "<p style='color:red'>❌ Database Connection Failed: " . $e->getMessage() . "</p>";
    }

} catch (\Throwable $e) {
    echo "<div style='background:#fee; border:1px solid red; padding:20px;'>";
    echo "<h2>🔥 Fatal Error Caught</h2>";
    echo "<h3>" . get_class($e) . "</h3>";
    echo "<p><strong>Message:</strong> " . $e->getMessage() . "</p>";
    echo "<p><strong>File:</strong> " . $e->getFile() . " on line " . $e->getLine() . "</p>";
    echo "<pre>" . $e->getTraceAsString() . "</pre>";
    echo "</div>";
}
