<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Origen;

class origenController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    
    public function cargarTodo()
    {
        return Origen::orderBy('name')->paginate(15);
    }

    public function cargarFiltrado(Request $rq){

        return Origen::find(1)->cargarFiltro($rq->nombre)->paginate(15);

    }

    public function cargarTodo_sin_pagination()
    {
        return Origen::orderBy('name')->get();
    }

    public function agregar(Request $rq)
    {
        
        $respuesta=false;
        try{
            if ($rq->nombre=='') {
                return ['codigo_respuesta'=>0,'nombre'=>"El nombre no puede estar vacio"];
            }
            $nombre=strtoupper($rq->nombre);
            $origen = new Origen;
            $origen->name = $nombre;
            $origen->save();
            $respuesta = ['codigo_respuesta'=>1,'nombre'=>"Origen Agregado!"];//1 es true basicamente
            return  $respuesta;

        }catch(\Throwable $e){
            return ['codigo_respuesta'=>0,'nombre'=>"Ocurrio un error inesperado al registrar el origen"];
        }
    }
    public function editar(Request $rq)
    {
        
        try{
            if ($rq->nombre=='') {
                return ['codigo_respuesta'=>0,'nombre'=>"El nombre no puede estar vacio"];
            }
            $nombre=strtoupper($rq->nombre);
            $origen = Origen::find($rq->id);
            if($origen->name==$rq->nombre){return ['codigo_respuesta'=>0,'nombre'=>"El origen que desea editar ya tiene este nombre"]; }
            $origen->name = $nombre;
            $origen->save();
            $respuesta = ['codigo_respuesta'=>1,'nombre'=>"Origen Modificado!"];//1 es true basicamente
            return  $respuesta;

        }catch(\Throwable $e){
            return ['codigo_respuesta'=>0,'nombre'=>"Ocurrio un error inesperado al editar El origen"];
        }
    }
    public function buscar(Request $rq)
    {
        try{

            $nombre_origen=$rq->nombre_origen_buscar;
            
            $nombres    =   Origen::where("name",'like',"%".$nombre_origen."%")->orwhere("id",'like',"%".$nombre_origen."%")->limit(10)->get();
         
            return ['codigo_respuesta'=>1,'data'=>$nombres];
        }catch(\Exception $e){
            return ['codigo_respuesta'=>0,'nombre'=>"no hay resultados"];
        }
    }
    public function eliminar(Request $rq)
    {
        try {
            if($rq->id){
                $id=$rq->id;
                $respuesta = Origen::where('id', $id)->delete();
                
            $respuesta = ['codigo_respuesta'=>1,'nombre'=>"Origen Eliminado!"];//1 es true basicamente 0 es false
            return $respuesta;

            }
        } catch (\Throwable $th) {
            return ['codigo_respuesta'=>0,'nombre'=>"Ocurrio un error inesperado al eliminar la categoria\n Es posible que el error se produce al borrar un registro relacionado"];
        }
    }
}
