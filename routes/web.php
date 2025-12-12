<?php

use App\Http\Controllers\NationalityController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;



const PAGINATION_COUNT = 10;





Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Route::get('dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware([
    'Lang',
    'auth',
    // 'verified',
])->group(function () {

    Route::get('dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    
    Route::get('dashboard2', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard2');

    Route::get('dashboard3', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard3');

    Route::get('dashboard4', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard4');

    Route::get('dashboard5', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard5');

    Route::get('dashboard6', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard6');


        Route::resource('nationalities', NationalityController::class);



       //////////// to change lang /////////
       Route::get('/change_lang/{locale}', function ($locale) {
        // dd('hi');
        App::setLocale($locale);
        session()->put('lang', $locale);
        return redirect()->back();
    })->name('lang');

});






require __DIR__.'/settings.php';
