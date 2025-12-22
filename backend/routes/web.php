<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Models\User;

Route::get('/', function () {
    return view('welcome');
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
