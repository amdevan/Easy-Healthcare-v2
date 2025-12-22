<?php

// Enable error reporting to see what's wrong
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

echo "<h1>Storage & Environment Check</h1>";
echo "<p>Current Script Path: " . __DIR__ . "</p>";

// Helper to find file in current or parent dir
function findFile($filename) {
    if (file_exists(__DIR__ . '/' . $filename)) return __DIR__ . '/' . $filename;
    if (file_exists(dirname(__DIR__) . '/' . $filename)) return dirname(__DIR__) . '/' . $filename;
    return false;
}

// 1. Check .env
$envPath = findFile('.env');
$baseDir = $envPath ? dirname($envPath) : __DIR__; // Assuming .env is at root

if ($envPath) {
    echo "<p style='color:green'>✅ Found .env at: $envPath</p>";
    
    $envContent = file_get_contents($envPath);
    preg_match('/^APP_URL=(.*)$/m', $envContent, $matches);
    $appUrl = isset($matches[1]) ? trim($matches[1]) : 'NOT SET';
    echo "<p><strong>APP_URL:</strong> " . htmlspecialchars($appUrl) . "</p>";
    
    if (strpos($appUrl, 'localhost') !== false) {
        echo "<p style='color:red'>WARNING: APP_URL is set to localhost.</p>";
    }
} else {
    echo "<p style='color:red'>❌ .env file not found in current or parent directory!</p>";
}

// 2. Check Storage Symlink
// We need to find where 'public' is.
// If we are in 'public', the link should be here.
// If we are in root, the link is in 'public/storage'.

$possibleLinks = [
    $baseDir . '/public/storage',
    __DIR__ . '/storage'
];

$linkFound = false;
foreach ($possibleLinks as $path) {
    if (file_exists($path)) {
        echo "<p>Checking path: $path</p>";
        if (is_link($path)) {
            echo "<p style='color:green'>✅ Symlink found at: $path</p>";
            echo "<p>Target: " . readlink($path) . "</p>";
            $linkFound = true;
        } else {
            echo "<p style='color:orange'>⚠️ Found directory (not symlink) at: $path</p>";
        }
    }
}

if (!$linkFound) {
    echo "<p style='color:red'>❌ Storage symlink not found.</p>";
    echo "<p>Run <code>php artisan storage:link</code></p>";
}

// 3. Check Write Permission
$storageAppPublic = $baseDir . '/storage/app/public';
if (is_writable($storageAppPublic)) {
    echo "<p style='color:green'>✅ storage/app/public is writable.</p>";
    
    // Try writing a test file
    $testFile = $storageAppPublic . '/test_image.txt';
    if (file_put_contents($testFile, 'This is a test file.')) {
        echo "<p style='color:green'>✅ Wrote test file.</p>";
        if (isset($appUrl)) {
             $testUrl = rtrim($appUrl, '/') . '/storage/test_image.txt';
             echo "<p><a href='$testUrl' target='_blank'>Check Test File</a></p>";
        }
    } else {
        echo "<p style='color:red'>❌ Failed to write test file.</p>";
    }
} else {
    echo "<p style='color:red'>❌ storage/app/public is NOT writable.</p>";
    echo "<p>Path: $storageAppPublic</p>";
}
