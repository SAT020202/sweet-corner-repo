<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $table = 'client';
    protected $primaryKey = 'idClient';
    public $timestamps = false;

    protected $fillable = ['idClient'];
}
