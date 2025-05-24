<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UniteProduit;
use App\Models\Produit;

class UniteProduitController extends Controller
{
public function index($idProduit)
{
    $unites = \DB::table('unite_produit')
        ->join('produit', 'unite_produit.idProduit', '=', 'produit.idProduit')
        ->join('categorie', 'produit.idCategorie', '=', 'categorie.idCategorie')
        ->select(
            'unite_produit.idUnite',
            'unite_produit.idProduit',
            'unite_produit.datePeremption',
            'produit.nom as nomProduit',
            'categorie.nom as nomCategorie'
        )
        ->where('unite_produit.idProduit', $idProduit)
        ->orderBy('unite_produit.idUnite', 'desc')
        ->get();

    return response()->json($unites);
}

        public function all()
    {
        $unites = \DB::table('unite_produit')
            ->join('produit', 'unite_produit.idProduit', '=', 'produit.idProduit')
            ->join('categorie', 'produit.idCategorie', '=', 'categorie.idCategorie')
            ->select(
                'unite_produit.idUnite',
                'unite_produit.datePeremption',
                'produit.nom as nomProduit',
                'categorie.nom as nomCategorie'
            )
            ->orderBy('unite_produit.idUnite', 'desc')
            ->get();

        return response()->json($unites);
    }

    // Ajouter une unité
    public function store(Request $request)
    {
        $validated = $request->validate([
            'datePeremption' => 'required|date',
            'idAdmin' => 'required|exists:admin,idAdmin',
            'idProduit' => 'required|exists:produit,idProduit',
        ]);

        $unite = UniteProduit::create($validated);

        // Mettre à jour la quantité du produit
        $produit = Produit::find($validated['idProduit']);
        if (!$produit) {
            return response()->json(['error' => 'Produit non trouvé'], 404);
        }
        $produit->quantite = UniteProduit::where('idProduit', $produit->idProduit)->count();
        $produit->save();

        return response()->json($unite, 201);
    }

    // Supprimer une unité
    public function destroy($idUnite)
    {
        $unite = UniteProduit::findOrFail($idUnite);
        $idProduit = $unite->idProduit;
        $unite->delete();

        // Mettre à jour la quantité du produit
        $produit = Produit::find($idProduit);
        if ($produit) {
            $produit->quantite = UniteProduit::where('idProduit', $idProduit)->count();
            $produit->save();
        }

        return response()->json(['message' => 'Unité supprimée']);
    }
}