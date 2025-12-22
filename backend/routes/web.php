<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Artisan;
use App\Models\User;
use App\Http\Controllers\InstallController;
use App\Http\Middleware\CheckNotInstalled;

Route::get('/storage/{path}', function ($path) {
    $filePath = storage_path('app/public/' . $path);

    if (!file_exists($filePath)) {
        abort(404);
    }

    return response()->file($filePath);
})->where('path', '.*');

// Installer Routes
Route::middleware([CheckNotInstalled::class])->prefix('install')->group(function () {
    Route::get('/', [InstallController::class, 'index'])->name('install.index');
    Route::get('/requirements', [InstallController::class, 'requirements'])->name('install.requirements');
    Route::get('/database', [InstallController::class, 'database'])->name('install.database');
    Route::post('/database', [InstallController::class, 'processDatabase'])->name('install.database.process');
    Route::get('/admin', [InstallController::class, 'admin'])->name('install.admin');
    Route::post('/admin', [InstallController::class, 'processAdmin'])->name('install.admin.process');
    Route::get('/finish', [InstallController::class, 'finish'])->name('install.finish');
});

Route::get('/', function () {
    if (!file_exists(storage_path('installed'))) {
        return redirect()->route('install.index');
    }
    return redirect('/admin');
});



// Local-only helper: login as the seeded admin and redirect to Filament
if (app()->environment('local')) {
    Route::get('/dev/login-as-admin', function () {
        $user = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            ['name' => 'Admin', 'password' => bcrypt('password')]
        );
        Auth::login($user);
        Log::info('Dev login-as-admin executed', ['user_id' => $user->id, 'session_id' => session()->getId()]);
        return redirect('/admin');
    });

    Route::get('/dev/whoami', function () {
        $user = Auth::user();
        return response()->json([
            'auth' => Auth::check(),
            'user' => $user ? [
                'id' => $user->id,
                'email' => $user->email,
                'name' => $user->name,
            ] : null,
            'session_id' => session()->getId(),
        ]);
    });

    // Local-only simple login to bypass Livewire / asset issues
    Route::get('/dev/simple-login', function () {
        return view('dev.simple-login');
    })->name('dev.simple-login');

    Route::post('/dev/simple-login', function () {
        $credentials = request()->only('email', 'password');
        if (Auth::attempt($credentials)) {
            request()->session()->regenerate();
            return redirect('/admin');
        }
        return back()->withErrors(['email' => 'Invalid credentials'])->withInput();
    });

    // Admin auth debug to verify session when accessing the panel
    Route::get('/admin/debug', function () {
        $user = Auth::user();
        return response()->json([
            'auth' => Auth::check(),
            'user' => $user ? [
                'id' => $user->id,
                'email' => $user->email,
                'name' => $user->name,
            ] : null,
            'session_id' => session()->getId(),
        ]);
    });
}
