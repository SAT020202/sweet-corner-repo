<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProduitTable extends Migration
{
    public function up(): void
    {
        Schema::create('produit', function (Blueprint $table) {
            $table->increments('idProduit');
            $table->string('nom', 250);
            $table->text('description')->nullable();
            $table->text('image');
            $table->decimal('prix', 8, 2);
            $table->integer('quantite')->default(0);
            $table->unsignedInteger('idCategorie');
            $table->foreign('idCategorie')
                ->references('idCategorie')
                ->on('categorie')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('produit');
    }
}