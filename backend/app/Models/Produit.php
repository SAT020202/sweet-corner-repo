<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    protected $table = 'produit';
    protected $primaryKey = 'idProduit';
    public $timestamps = false;

    protected $fillable = ['nom', 'description', 'image', 'prix', 'quantite', 'idCategorie'];

    public function categorie()
    {
        return $this->belongsTo(Categorie::class, 'idCategorie');
    }

    public function uniteProduits()
    {
        return $this->hasMany(UniteProduit::class, 'idProduit');
    }
}