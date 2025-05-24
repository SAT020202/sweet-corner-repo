<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $table = 'admin';
    protected $primaryKey = 'idAdmin';
    public $timestamps = false;

    protected $fillable = ['idAdmin'];

    
    public function uniteProduits()
    {
        return $this->hasMany(UniteProduit::class, 'idAdmin');
    }
}
