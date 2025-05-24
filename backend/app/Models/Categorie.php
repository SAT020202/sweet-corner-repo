<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    protected $table = 'categorie';
    protected $primaryKey = 'idCategorie';
    public $timestamps = false;

    protected $fillable = ['nom'];

    public function produits()
    {
        return $this->hasMany(Produit::class, 'idCategorie');
    }
}
