<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DoctorController;
use App\Http\Controllers\Api\SpecialtyController;
use App\Http\Controllers\Api\LabTestController;
use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\AppointmentController;
use App\Http\Controllers\Api\FaqController;
use App\Http\Controllers\Api\BannerController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\UiSettingController;
use App\Http\Controllers\Api\MediaController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ContactController;
use Illuminate\Http\Request;
use App\Models\Role;

Route::get('/doctors', [DoctorController::class, 'index']);
Route::get('/doctors/{doctor}', [DoctorController::class, 'show']);

Route::get('/specialties', [SpecialtyController::class, 'index']);
Route::get('/specialties/{specialty}', [SpecialtyController::class, 'show']);

Route::get('/lab-tests', [LabTestController::class, 'index']);
Route::get('/lab-tests/{labTest}', [LabTestController::class, 'show']);

Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/{article}', [ArticleController::class, 'show']);

Route::get('/appointments', [AppointmentController::class, 'index']);
Route::get('/appointments/{appointment}', [AppointmentController::class, 'show']);

// CMS
Route::get('/faqs', [FaqController::class, 'index']);
Route::get('/banners', [BannerController::class, 'index']);
Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::get('/settings', [UiSettingController::class, 'index']);
Route::get('/settings/{key}', [UiSettingController::class, 'show']);
Route::post('/settings', [UiSettingController::class, 'store']);
Route::put('/settings/{key}', [UiSettingController::class, 'update']);
Route::patch('/settings/{key}', [UiSettingController::class, 'patch']);
Route::delete('/settings/{key}', [UiSettingController::class, 'destroy']);

// Media CRUD
Route::apiResource('media', MediaController::class);

// Users CRUD
Route::apiResource('users', UserController::class);

// Contact form
Route::post('/contact', [ContactController::class, 'submit']);

// Roles CRUD (closure-based to minimize new files)
Route::get('/roles', function (Request $request) {
    $perPage = (int) $request->get('per_page', 15);
    return Role::query()->orderBy('id', 'desc')->paginate($perPage);
});

Route::post('/roles', function (Request $request) {
    $data = $request->validate([
        'name' => ['required', 'string', 'max:255'],
        'slug' => ['required', 'string', 'max:255', 'unique:roles,slug'],
        'description' => ['nullable', 'string', 'max:1000'],
    ]);
    $role = Role::create($data);
    return response()->json($role, 201);
});

Route::get('/roles/{role}', function (Role $role) {
    return $role;
});

Route::match(['put', 'patch'], '/roles/{role}', function (Request $request, Role $role) {
    $data = $request->validate([
        'name' => ['sometimes', 'required', 'string', 'max:255'],
        'slug' => ['sometimes', 'required', 'string', 'max:255', 'unique:roles,slug,' . $role->id],
        'description' => ['nullable', 'string', 'max:1000'],
    ]);
    $role->update($data);
    return $role;
});

Route::delete('/roles/{role}', function (Role $role) {
    $role->delete();
    return response()->noContent();
});