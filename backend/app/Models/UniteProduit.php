<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UniteProduit extends Model
{
    protected $table = 'unite_produit';
    protected $primaryKey = 'idUnite';
    public $timestamps = false;

    protected $fillable = ['datePeremption','idAdmin' ,'idProduit'];

    public function admin()
    {
        return $this->belongsTo(Admin::class, 'idAdmin');
    }

    public function produit()
    {
        return $this->belongsTo(Produit::class, 'idProduit');
    }
}