<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\UniteProduitController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//------------------------------------------Authentification------------------------------------------//

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/creerCompte', [AuthController::class, 'creerCompte']);
Route::post('/login', [AuthController::class, 'login']);




//------------------------------------------Categories------------------------------------------//

    Route::get('/categories', [CategorieController::class, 'index']);
    Route::get('/categories/{id}/produits', [CategorieController::class, 'produitsParCategorie']);

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::post('/categories', [CategorieController::class, 'store']);
    Route::put('/categories/{id}', [CategorieController::class, 'update']);
    Route::delete('/categories/{id}', [CategorieController::class, 'destroy']);    
});


//------------------------------------------Produits------------------------------------------//

Route::get('/produits', [ProduitController::class, 'index']); 
Route::get('/produits/{id}', [ProduitController::class, 'show']); 
Route::get('/produitss/{id}', [ProduitController::class, 'show']); 


Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::post('/produits', [ProduitController::class, 'store']); 
    Route::put('/produits/{id}', [ProduitController::class, 'update']); 
    Route::delete('/produits/{id}', [ProduitController::class, 'destroy']); 
});


//------------------------------------------Unites de produits------------------------------------------//
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/unites', [UniteProduitController::class, 'all']);
    Route::get('/produits/{idProduit}/unites', [UniteProduitController::class, 'index']);
    Route::post('/unites', [UniteProduitController::class, 'store']);
    Route::delete('/unites/{idUnite}', [UniteProduitController::class, 'destroy']);
});