<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\CommendationController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EbossInspectionController;
use App\Http\Controllers\InspectionController;
use App\Http\Controllers\OrientationController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('welcome');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/auth/verified/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/auth/verified/get-provinces-by-region', [AddressController::class, 'getProvincesByRegion']);
    Route::get('/auth/verified/get-cities-by-province', [AddressController::class, 'getCitiesByProvince']);

    Route::resource('/auth/verified/eboss', EbossInspectionController::class);
    Route::resource('/auth/verified/commendation', CommendationController::class);
    Route::resource('/auth/verified/inspection', InspectionController::class);
    Route::resource('/auth/verified/orientation', OrientationController::class);

    Route::get('/auth/verified/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/auth/verified/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/auth/verified/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
