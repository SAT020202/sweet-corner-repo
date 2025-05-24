<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles; 
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class Utilisateur extends Authenticatable
{
    use HasApiTokens, Notifiable;
    use HasRoles;
    protected $guard_name = 'web';
    protected $table = 'utilisateur';
    protected $primaryKey = 'idUtilisateur';
    public $timestamps = false;

    protected $fillable = ['email', 'password'];

    public function admin()
    {
        return $this->hasOne(Admin::class, 'idUtilisateur');
    }

    public function client()
    {
        return $this->hasOne(Client::class, 'idUtilisateur');
    }

    public function getKeyName()
    {
        return 'idUtilisateur'; // Indiquez que la clé primaire est idUtilisateur
    }
}
