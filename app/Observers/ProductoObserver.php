<?php

namespace App\Observers;

use App\Producto;
use App\producto_deleted;

class ProductoObserver
{
    /**
     * Handle the producto "created" event.
     *
     * @param  \App\Producto  $producto
     * @return void
     */
    public function created(Producto $producto)
    {
        //
    }

    /**
     * Handle the producto "updated" event.
     *
     * @param  \App\Producto  $producto
     * @return void
     */
    public function updated(Producto $producto)
    {
        //
    }

    /**
     * Handle the producto "deleted" event.
     *
     * @param  \App\Producto  $producto
     * @return void
     */
    public function deleted(Producto $producto)
    {
        try {
            //code...
            $producto_deleted = new producto_deleted;
            $user = auth()->user();
            $producto_deleted->id_cm = $producto->id_cm;
            $producto_deleted->usuario_id = $producto->usuario_id;
            $producto_deleted->description = $producto->description; 
            $producto_deleted->part_number = $producto->part_number;
            $producto_deleted->marca_id = $producto->marca_id; 
            $producto_deleted->categoria_id = $producto->categoria_id;
            $producto_deleted->prioridad_id = $producto->prioridad_id;
            $producto_deleted->responsable_id = $producto->responsable_id;
            $producto_deleted->origen_id = $producto->origen_id;
            $producto_deleted->nombre_origen_id = $producto->nombre_origen_id; 
            $producto_deleted->precio_sumatec = $producto->precio_sumatec;
            $producto_deleted->costo = $producto->costo ;
            $producto_deleted->transporte = $producto->transporte; 
            $producto_deleted->precio_competencia = $producto->precio_competencia; 
            $producto_deleted->trato_precio_id = $producto->trato_precio_id; 
            $producto_deleted->estatus_cm_id = $producto->estatus_cm_id;
            $producto_deleted->comentario_id = $producto->comentario_id;
            $producto_deleted->margen_precio = $producto->margen_precio;
            $producto_deleted->margen_oferta = $producto->margen_oferta;
            $producto_deleted->tope_oferta = $producto->tope_oferta;
            $producto_deleted->oferta = $producto->oferta;
            $producto_deleted->nota_adicional = $producto->nota_adicional;
            $producto_deleted->margen_tope_oferta = $producto->margen_tope_oferta;
            $producto_deleted->margen_tope_oferta = $producto->margen_tope_oferta;
            $producto_deleted->user_deleted = $user->name;
    
            $producto_deleted->save();
        } catch (\Throwable $th) {
            //throw $th;
            debug_zval_dump($th);
        }
    }
    
    public function deleting(Producto $producto)
    {
        //
        
        
    }

    /**
     * Handle the producto "restored" event.
     *
     * @param  \App\Producto  $producto
     * @return void
     */
    public function restored(Producto $producto)
    {
        //
    }

    /**
     * Handle the producto "force deleted" event.
     *
     * @param  \App\Producto  $producto
     * @return void
     */
    public function forceDeleted(Producto $producto)
    {
        //
    }
}
