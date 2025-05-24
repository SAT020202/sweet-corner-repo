<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdminTable extends Migration
{
    public function up(): void
    {
        Schema::create('admin', function (Blueprint $table) {
            $table->id('idAdmin', 50);
            $table->foreign('idAdmin')
                ->references('idUtilisateur')
                ->on('utilisateur')
                ->onUpdate('cascade')
                ->onDelete('cascade');

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('admin');
    }
}