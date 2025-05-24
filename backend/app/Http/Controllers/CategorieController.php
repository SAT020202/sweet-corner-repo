<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categorie;


class CategorieController extends Controller
{
    // Récupérer toutes les catégories
    public function index()
    {
        $categories = Categorie::all();
        return response()->json($categories);
    }

    // Ajouter une nouvelle catégorie
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
        ]);

        $categorie = Categorie::create($validatedData);
        return response()->json($categorie, 201);
    }
    // Mettre à jour une catégorie existante
    public function update(Request $request, $id)
    {
        $categorie = Categorie::findOrFail($id);

        $validatedData = $request->validate([
            'nom' => 'sometimes|required|string|max:255',
        ]);

        $categorie->update($validatedData);
        return response()->json($categorie);
    }

    // Supprimer une catégorie
    public function destroy($id)
    {
        $categorie = Categorie::findOrFail($id);
        $categorie->delete();

        return response()->json(['message' => 'Catégorie supprimée avec succès']);
    }

    public function produitsParCategorie($id)
    {
        $categorie = Categorie::findOrFail($id);
        // Si tu as une relation "produits" dans ton modèle Categorie :
        return response()->json($categorie->produits);
    }
}

