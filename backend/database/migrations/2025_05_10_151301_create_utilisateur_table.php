<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUtilisateurTable extends Migration
{
    public function up(): void
    {
        Schema::create('utilisateur', function (Blueprint $table) {
            $table->increments('idUtilisateur',50);
            $table->string('email', 100)->unique();
            $table->string('password', 50);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('utilisateur');
    }
};