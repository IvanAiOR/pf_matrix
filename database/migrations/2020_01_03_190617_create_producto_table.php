<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('producto', function (Blueprint $table) {
            //columnas
            $table->bigIncrements('id')->unque()->index();
            $table->unsignedBigInteger('id_CM')->unique()->index();
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
            $table->decimal('precio_sumatec',11,2)->default(0.00);
            $table->decimal('costo',11,2)->default(0.00);
            $table->decimal('transporte',11,2)->default(0.00);
            $table->decimal('precio_competencia',11,2)->default(0.00);
            $table->decimal('margen_precio',11,2)->default(0.00);
            $table->decimal('margen_oferta',11,2)->default(0.00);
            $table->decimal('tope_oferta',11,2)->default(0.00);
            $table->decimal('margen_tope_oferta',11,2)->default(0.00);
            $table->decimal('oferta',11,2)->default(0.00);
            $table->longText('nota_adicional');
            $table->date('fecha_inicio_oferta');
            $table->date('fecha_fin_oferta');

            $table->timestamps();



            //foraneas
            $table->foreign('responsable_id')->references('id')->on('users');
            $table->foreign('marca_id')->references('id')->on('marca');
            $table->foreign('categoria_id')->references('id')->on('categoria');
            $table->foreign('prioridad_id')->references('id')->on('prioridad');
            $table->foreign('origen_id')->references('id')->on('origen');
            $table->foreign('nombre_origen_id')->references('id')->on('nombre_origen');
            $table->foreign('estatus_cm_id')->references('id')->on('estatus_cm');
            $table->foreign('trato_precio_id')->references('id')->on('trato_precio');
            $table->foreign('comentario_id')->references('id')->on('comentario');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('producto');
    }
}
