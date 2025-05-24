<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Produit;
use App\Models\Categorie;



class ProduitController extends Controller
{
    // Afficher tous les produits
    public function index()
    {
        $produits = Produit::with('categorie')->get(); // Inclut la catégorie associée
        return response()->json($produits);
    }

    // Afficher un produit spécifique
    public function show($id)
    {
        $produit = Produit::with('categorie')->find($id);
        if (!$produit) {
            return response()->json(['message' => 'Produit non trouvé'], 404);
        }
        return response()->json($produit);
    }

    // Ajouter un produit
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'prix' => 'required|numeric',
            'categorie_id' => 'required|exists:categorie,idCategorie',
        ]);

        // Conversion de la clé pour correspondre à la base de données
        $validated['idCategorie'] = $validated['categorie_id'];
        unset($validated['categorie_id']);

        // Gestion de l'upload de l'image
        if ($request->hasFile('image')) {
            $imageName = time().'_'.$request->file('image')->getClientOriginalName();
            $request->file('image')->move(public_path('uploads'), $imageName);
            $validated['image'] = 'uploads/' . $imageName; // Chemin à stocker en base
        }



        $produit = Produit::create($validated);
        return response()->json($produit, 201);
    }

    // Modifier un produit
    public function update(Request $request, $id)
    {
        $produit = Produit::find($id);
        if (!$produit) {
            return response()->json(['message' => 'Produit non trouvé'], 404);
        }

        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // <-- comme dans store
            'prix' => 'required|numeric',
            'categorie_id' => 'required|exists:categorie,idCategorie',
        ]);

        // Conversion de la clé pour correspondre à la base de données
        $validated['idCategorie'] = $validated['categorie_id'];
        unset($validated['categorie_id']);

        // Gestion de l'upload de l'image (comme dans store)
        if ($request->hasFile('image')) {
            $imageName = time().'_'.$request->file('image')->getClientOriginalName();
            $request->file('image')->move(public_path('uploads'), $imageName);
            $validated['image'] = 'uploads/' . $imageName;
        }

        $produit->update($validated);
        return response()->json($produit);
    }

   // Supprimer un produit
    public function destroy($id)
    {
        $produit = Produit::find($id);
        if (!$produit) {
            return response()->json(['message' => 'Produit non trouvé'], 404);
        }

        $produit->delete();
        return response()->json(['message' => 'Produit supprimé']);
    }
}