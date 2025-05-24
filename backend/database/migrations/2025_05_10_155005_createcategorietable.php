<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategorieTable extends Migration
{
    public function up(): void
    {
        Schema::create('categorie', function (Blueprint $table) {
            $table->increments('idCategorie');
            $table->string('nom', 100);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('categorie');
    }
}