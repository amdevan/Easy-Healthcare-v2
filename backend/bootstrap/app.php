<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Enable CORS for API to allow frontend (localhost:3000) access during development
        $middleware->append(\Illuminate\Http\Middleware\HandleCors::class);
        // Local development: relax CSRF to unblock Livewire + Filament login
        // NOTE: This is for local dev only; remove before production.
        if (env('APP_ENV') === 'local') {
            $middleware->validateCsrfTokens(except: [
                'livewire/*',
                'admin/*',
            ]);
        }
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
