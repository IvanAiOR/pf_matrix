<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Nombre_origen;
use Illuminate\Support\Facades\DB;

class nombre_origenController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth');
    }
    

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    
    public function index(){
        $rol= DB::table('rol')->where('id',auth()->user()->rol_id)->get()[0];
        if ($rol->gestion_parametros==0) {//verificar si el usuario posee permisos para acceder a esta URL
            return \back();
        }
        return view('menu.nombre_origen.main');
    }

    public function cargarTodo()
    {
        return Nombre_origen::orderBy('name')->paginate(15);
    }

    public function cargarFiltrado(Request $rq){

        return Nombre_origen::find(1)->cargarFiltro($rq->nombre)->paginate(15);

    }

    public function cargarTodo_sin_pagination()
    {
        return Nombre_origen::orderBy('name')->get();
    }

    public function agregar(Request $rq)
    {
        $respuesta=false;
        try{
            if ($rq->nombre=='') {
                return ['codigo_respuesta'=>0,'nombre'=>"El nombre no puede estar vacio"];
            }
            $nombre=strtoupper($rq->nombre);
            $nombre_origen = new Nombre_origen;
            $nombre_origen->name = $nombre;
            $nombre_origen->save();
            $respuesta = ['codigo_respuesta'=>1,'nombre'=>"Estatus Agregado!"];//1 es true basicamente
            return  $respuesta;

        }catch(\Throwable $e){
            return ['codigo_respuesta'=>0,'nombre'=>"Ocurrio un error inesperado al registrar el estatus"];
        }
    }
    public function editar(Request $rq)
    {
        
        try{
            if ($rq->nombre=='') {
                return ['codigo_respuesta'=>0,'nombre'=>"El nombre no puede estar vacio"];
            }
            $nombre=strtoupper($rq->nombre);
            $nombre_origen = Nombre_origen::find($rq->id);
            if($nombre_origen->name==$rq->nombre){return ['codigo_respuesta'=>0,'nombre'=>"El estatus que desea editar ya tiene este nombre"]; }
            $nombre_origen->name = $nombre;
            $nombre_origen->save();
            $respuesta = ['codigo_respuesta'=>1,'nombre'=>"Estatus Modificado!"];//1 es true basicamente
            return  $respuesta;

        }catch(\Throwable $e){
            return ['codigo_respuesta'=>0,'nombre'=>"Ocurrio un error inesperado al editar el estatus"];
        }
    }
    public function buscar(Request $rq)
    {
        try{

            $nombre_nombre_origen=$rq->nombre_nombre_origen_buscar;
            
            $nombres    =   Nombre_origen::where("name",'like',"%".$nombre_nombre_origen."%")->orwhere("id",'like',"%".$nombre_nombre_origen."%")->limit(10)->get();
         
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
                $respuesta = Nombre_origen::where('id', $id)->delete();
                
            $respuesta = ['codigo_respuesta'=>1,'nombre'=>"Estatus Eliminado!"];//1 es true basicamente 0 es false
            return $respuesta;

            }
        } catch (\Throwable $th) {
            return ['codigo_respuesta'=>0,'nombre'=>"Ocurrio un error inesperado al eliminar el nombre de origen\n Es posible que el error se produce al borrar un registro relacionado"];
        }
    }
}
