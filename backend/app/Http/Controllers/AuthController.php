<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Utilisateur;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    

    public function login(Request $request)
    {
        $user = Utilisateur::where('email', $request->email)->first();
        if (!$user || !\Hash::check($request->password, $user->password)) {
            return response()->json(['success' => false, 'message' => 'Identifiants invalides']);
        }
        $role = $user->getRoleNames()->first();


        if (!$role) {
        return response()->json(['success' => false, 'message' => 'Aucun rôle attribué']);
    }

        // Récupère idAdmin si admin
        $idAdmin = null;
        if ($role === 'admin') {
            $admin = \DB::table('admin')->where('idAdmin', $user->idUtilisateur)->first();
            if ($admin) {
                $idAdmin = $admin->idAdmin;
            } else {
                // Ajoute ce log temporaire
                \Log::error('Aucun admin trouvé pour idUtilisateur: ' . $user->idUtilisateur);
            }
        }

        // Générer un token Sanctum
        $token = $user->createToken('token-name')->plainTextToken;
        return response()->json([
            'success' => true,
            'message' => 'Connexion réussie',

            'user' => [
                'id' => $user->idUtilisateur,
                'email' => $user->email,
                'role' => $role,
                'idAdmin' => $idAdmin,
            ],
            'token' => $token
        ]);
    }
    /*public function logout(Request $request)
    {
        Auth::logout();
        return response()->json(['message' => 'Déconnexion réussie']);
    }*/
 

    public function creerCompte(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:utilisateur,email',
 
            'password' => 'required|min:6|confirmed',
        ]);

        $user = Utilisateur::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole('client'); // Spatie : assigne le rôle client

        return response()->json(['success' => true, 'message' => 'Compte créé avec succès']);
    }
}