<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\producto_delete;

class Producto extends Model
{
    //
    protected $table = 'producto';
    protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'id_CM',
        'description',
        'part_number',
        'categoria_id',
        'marca_id',
        'prioridad_id',
        'origen_id',
        'nombre_origen_id',
        'estatus_cm_id',
        'comentario_id',
        'responsable_id',
        'trato_precio_id',
        'precio_sumatec',
        'costo',
        'transporte',
        'precio_competencia',
        'margen_precio',
        'margen_oferta',
        'tope_oferta',
        'margen_tope_oferta',
        'oferta',
        'nota_adicional',
        'fecha_inicio_oferta',
        'fecha_fin_oferta'  
    ];

  

    



}
