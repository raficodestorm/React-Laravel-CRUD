<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;

// Route::get('/student', [StudentController::class , 'index']);

Route::get('/', function () {
    return view('welcome');
});
