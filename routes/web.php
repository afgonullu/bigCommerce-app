<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AppController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/api/accessToken', [AppController::class, "getAccessToken"]);

Route::get('/api/state', [AppController::class, "getOnboardedState"]);
Route::post('/api/state', [AppController::class, "setOnboardedState"]);

Route::post('/api/exchange_auth_code', [AppController::class, "exchangeAuthCodeForTokenAndProfile"]);

Route::get('/{url?}', function () {
    return view('index');
})->where('', 'products');

Route::group(['prefix' => 'auth'], function () {
    Route::get('install', [AppController::class, "install"]);

    Route::get('load', [AppController::class, "load"]);

    Route::get('uninstall', function () {
        echo 'uninstall';
        return app()->version();
    });

    Route::get('remove-user', function () {
        echo 'remove-user';
        return app()->version();
    });
});

Route::get('error', [AppController::class, "error"]);

Route::any('/bc-api/{endpoint}', [AppController::class, "proxyBigCommerceAPIRequest"])
    ->where('endpoint', 'v2\/.*|v3\/.*');
