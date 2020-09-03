<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\producto_deleted;
use App\producto;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class productoDeletedController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        // $var="hola";
        // return $var; 
        return view('producto_deleted.main');
    }

    public function cargarTodo()
    {
        $consulta=DB::table('producto_deleted')
        ->join('marca', 'producto_deleted.marca_id', '=', 'marca.id')
        ->join('categoria', 'producto_deleted.categoria_id', '=', 'categoria.id')
        ->join('users', 'producto_deleted.responsable_id', '=', 'users.id')
        ->join('origen', 'producto_deleted.origen_id', '=', 'origen.id')
        ->join('prioridad', 'producto_deleted.prioridad_id', '=', 'prioridad.id')
        ->join('comentario', 'producto_deleted.comentario_id', '=', 'comentario.id')
        ->join('nombre_origen', 'producto_deleted.nombre_origen_id', '=', 'nombre_origen.id')
        ->join('trato_precio', 'producto_deleted.trato_precio_id', '=', 'trato_precio.id')
        ->join('estatus_cm', 'producto_deleted.estatus_cm_id', '=', 'estatus_cm.id')
        ->select(
            'producto_deleted.*',
            'marca.name as marca' ,
         'categoria.name as categoria',
         'origen.name as origen',
         'prioridad.name as prioridad',
         'comentario.name as comentario',
         'nombre_origen.name as nombre_origen',
         'trato_precio.name as trato_precio',
         'estatus_cm.name as estatus_cm',
         'users.name as responsable')
         ->orderBy('id_cm', 'DESC')
         ->paginate(15)
         ;
        // die($consulta->tosql());
        return  $consulta;
            
    }

    public function buscar(Request $rq)
    {
        try{

            $nombre_producto=$rq->nombre_producto_buscar;
             $nombres = DB::table('producto_deleted')
            ->join('marca', 'producto_deleted.marca_id', '=', 'marca.id')
            ->join('categoria', 'producto_deleted.categoria_id', '=', 'categoria.id')
            ->join('users', 'producto_deleted.responsable_id', '=', 'users.id')
            ->join('origen', 'producto_deleted.origen_id', '=', 'origen.id')
            ->join('prioridad', 'producto_deleted.prioridad_id', '=', 'prioridad.id')
            ->join('comentario', 'producto_deleted.comentario_id', '=', 'comentario.id')
            ->join('nombre_origen', 'producto_deleted.nombre_origen_id', '=', 'nombre_origen.id')
            ->join('trato_precio', 'producto_deleted.trato_precio_id', '=', 'trato_precio.id')
            ->join('estatus_cm', 'producto_deleted.estatus_cm_id', '=', 'estatus_cm.id')
            ->select(
            'producto_deleted.*',
            'marca.name as marca' ,
             'categoria.name as categoria',
             'origen.name as origen',
             'prioridad.name as prioridad',
             'comentario.name as comentario',
             'nombre_origen.name as nombre_origen',
             'trato_precio.name as trato_precio',
             'estatus_cm.name as estatus_cm',
             'users.name as responsable')
             ->where("description",'like',"%".$nombre_producto."%")
             ->orwhere("id_cm",'like',"%".$nombre_producto."%")
             ->orwhere("part_number",'like',"%".$nombre_producto."%")
             ->orderBy('id_cm', 'DESC')
             ->limit(10)->get();

         
            return ['codigo_respuesta'=>1,'data'=>$nombres];
        }catch(\Exception $e){
            return ['codigo_respuesta'=>0,'nombre'=>"no hay resultados"];
        }
    }

    public function restaurarProducto(Request $rq)
    {
        try {
            //code...
            $producto_restaurar = DB::table('producto_deleted')->where('id',$rq->id)->get()[0];
        } catch (\Throwable $th) {
            return ['codigo_respuesta'=>0,'nombre'=>"No se pudo encontrar el producto ha recuperar"];
        }



        // try{
            $producto = new Producto;
            $producto->id_cm = $producto_restaurar->id_cm;
            $user = auth()->user();
            $producto->usuario_id = $user->id;
            $producto->description = strtoupper($producto_restaurar->description);
            $producto->part_number = strtoupper($producto_restaurar->part_number);
            $producto->marca_id = $producto_restaurar->marca_id;
            $producto->categoria_id = $producto_restaurar->categoria_id;
            $producto->prioridad_id = $producto_restaurar->prioridad_id;
            $producto->responsable_id = $producto_restaurar->responsable_id;
            $producto->origen_id = $producto_restaurar->origen_id;
            $producto->nombre_origen_id = $producto_restaurar->nombre_origen_id;
            $producto->precio_sumatec = $producto_restaurar->precio_sumatec;
            $producto->costo = $producto_restaurar->costo;
            $producto->transporte = $producto_restaurar->transporte;
            $producto->precio_competencia = $producto_restaurar->precio_competencia;
            $producto->trato_precio_id = $producto_restaurar->trato_precio_id;
            $producto->estatus_cm_id = $producto_restaurar->estatus_cm_id;
            $producto->comentario_id = $producto_restaurar->comentario_id;
            $producto->margen_precio = $producto_restaurar->margen_precio;
            $producto->margen_oferta = $producto_restaurar->margen_oferta;
            $producto->tope_oferta = $producto_restaurar->tope_oferta;
            $producto->oferta = $producto_restaurar->oferta;
            $producto->nota_adicional = strtoupper($producto_restaurar->nota_adicional);
            $producto->margen_tope_oferta = $producto_restaurar->margen_tope_oferta;
            
            try{//si el producto seguarda intentará hacer una consulta para borrar el mismo producto por el id_cm
                DB::delete('delete from producto_deleted where producto_deleted.id_cm = ?', [$producto_restaurar->id_cm]);
            }catch(\Throwable $e){
                return ['codigo_respuesta'=>0,'nombre'=>"Ocurrio un error al limpiar el registro de respaldo de archivos eliminados"];
                
            }
            $producto->save();
            $respuesta = ['codigo_respuesta'=>1,'nombre'=>"Producto Restaurado!"];//1 es true basicamente correcto
            return  $respuesta;

        // }catch(\Throwable $e){
            
        //     return ['codigo_respuesta'=>0,'nombre'=>"Ocurrio un error inesperado al registrar el producto \n puede que el producto ya haya sido registrado,\n revise la lista de productos"];
        // }
    }

}
