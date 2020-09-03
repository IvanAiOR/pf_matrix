<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductoDeletedTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('producto_deleted', function (Blueprint $table) {
            $table->bigIncrements('id')->index();
            $table->unsignedBigInteger('id_cm');
            $table->longText('description');
            $table->string('part_number');
            $table->unsignedBigInteger('categoria_id');
            $table->unsignedBigInteger('marca_id');
            $table->unsignedBigInteger('prioridad_id');
            $table->unsignedBigInteger('origen_id');
            $table->unsignedBigInteger('nombre_origen_id');
            $table->unsignedBigInteger('estatus_cm_id');
            $table->unsignedBigInteger('comentario_id');
            $table->unsignedBigInteger('responsable_id');
            $table->unsignedBigInteger('trato_precio_id');
            $table->decimal('precio_sumatec',11,2)->nullable();
            $table->decimal('costo',11,2)->nullable();
            $table->decimal('transporte',11,2)->nullable();
            $table->decimal('precio_competencia',11,2)->nullable();
            $table->decimal('margen_precio',11,2)->nullable();
            $table->decimal('margen_oferta',11,2)->nullable();
            $table->decimal('tope_oferta',11,2)->nullable();
            $table->decimal('margen_tope_oferta',11,2)->nullable();
            $table->decimal('oferta',11,2)->nullable();
            $table->longText('nota_adicional')->nullable();
            $table->date('fecha_inicio_oferta')->nullable();
            $table->date('fecha_fin_oferta')->nullable();
            $table->string('user_deleted')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('producto_deleted');
    }
}
