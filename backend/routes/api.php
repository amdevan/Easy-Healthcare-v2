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
use App\Http\Controllers\Api\InquiryController;
use App\Http\Controllers\Api\PageController;
use App\Http\Controllers\Api\FrontendController;
use App\Http\Controllers\Api\BoardMemberController;
use App\Http\Controllers\Api\PatientController;
use App\Http\Controllers\Api\NemtBookingController;
use App\Http\Controllers\Api\MembershipController;
use App\Http\Controllers\Api\PackageRequestController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PatientPanelController;
use Illuminate\Http\Request;
use App\Models\Role;

Route::get('/doctors', [DoctorController::class, 'index']);
Route::get('/doctors/{doctor}', [DoctorController::class, 'show']);
Route::get('/doctors/{doctor}/availability', [DoctorController::class, 'availability']);
Route::get('/doctors/slug/{slug}', [DoctorController::class, 'showBySlug']);
Route::post('/doctors', [DoctorController::class, 'store']);
Route::match(['put', 'patch'], '/doctors/{doctor}', [DoctorController::class, 'update']);

Route::get('/specialties', [SpecialtyController::class, 'index']);
Route::get('/specialties/{specialty}', [SpecialtyController::class, 'show']);

Route::get('/lab-tests', [LabTestController::class, 'index']);
Route::get('/lab-tests/{labTest}', [LabTestController::class, 'show']);

Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/{article}', [ArticleController::class, 'show']);

Route::get('/appointments', [AppointmentController::class, 'index']);
Route::get('/appointments/{appointment}', [AppointmentController::class, 'show']);
Route::post('/appointments', [AppointmentController::class, 'store']);
Route::match(['put', 'patch'], '/appointments/{appointment}', [AppointmentController::class, 'update']);

// Patients CRUD + nested appointments
Route::apiResource('patients', PatientController::class)->only(['index', 'show', 'store', 'update', 'destroy']);
Route::get('/patients/{patient}/appointments', [PatientController::class, 'appointments']);
Route::post('/patients/{patient}/appointments', [PatientController::class, 'storeAppointment']);
Route::get('/patients/{patient}/appointments/export', [PatientController::class, 'exportAppointments']);

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
Route::get('/settings/{key}/html', [UiSettingController::class, 'getHtml']);
Route::match(['put', 'patch'], '/settings/{key}/html', [UiSettingController::class, 'setHtml']);

// Media CRUD
Route::apiResource('media', MediaController::class);

// Users CRUD
Route::apiResource('users', UserController::class);

// Contact form
Route::post('/contact', [InquiryController::class, 'store']);
Route::post('/volunteer', [InquiryController::class, 'volunteer']);

// NEMT Booking
Route::post('/nemt-requests', [NemtBookingController::class, 'store']);

// Membership Booking
Route::post('/memberships', [MembershipController::class, 'store']);

// Package Booking
Route::post('/package-requests', [PackageRequestController::class, 'store']);

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

// Pages management (backed by Page model)
Route::get('/pages', [PageController::class, 'index']);
Route::get('/pages/{slug}', [PageController::class, 'show']);

// Board members CRUD
Route::apiResource('board-members', BoardMemberController::class)->only(['index', 'show', 'store', 'update', 'destroy']);

// Aggregate frontend data
Route::get('/frontend', [FrontendController::class, 'index']);

// Server time (to align frontend date/time with backend timezone)
Route::get('/time', function () {
    return response()->json([
        'now' => now()->toIso8601String(),
        'timezone' => config('app.timezone') ?? date_default_timezone_get(),
        'utc_now' => now('UTC')->toIso8601String(),
    ]);
});

// Authentication
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    // Patient Panel
    Route::prefix('my')->group(function () {
        Route::put('/profile', [PatientPanelController::class, 'updateProfile']);
        
        Route::get('/appointments', [PatientPanelController::class, 'appointments']);
        Route::post('/appointments', [PatientPanelController::class, 'storeAppointment']);
        Route::post('/appointments/{id}/cancel', [PatientPanelController::class, 'cancelAppointment']);
        
        Route::get('/prescriptions', [PatientPanelController::class, 'prescriptions']);
        Route::get('/lab-appointments', [PatientPanelController::class, 'labAppointments']);
    });
});
