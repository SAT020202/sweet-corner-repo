<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUniteProduitTable extends Migration
{
    public function up(): void
    {
        Schema::create('unite_produit', function (Blueprint $table) {
            $table->increments('idUnite');
            $table->dateTime('datePeremption');
            $table->string('idAdmin', 50);
            $table->unsignedInteger('idProduit');
            $table->foreign('idAdmin')
                ->references('idAdmin')
                ->on('admin')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreign('idProduit')
                ->references('idProduit')
                ->on('produit')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('unite_produit');
    }
}