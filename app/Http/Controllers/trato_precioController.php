<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Trato_precio;
use Illuminate\Support\Facades\DB;

class trato_precioController extends Controller
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
        return view('menu.trato_precio.main');
    }

    public function cargarTodo()
    {
        return Trato_precio::orderBy('name')->paginate(15);
    }

    public function cargarFiltrado(Request $rq){

        return Trato_precio::find(1)->cargarFiltro($rq->nombre)->paginate(15);

    }

    public function cargarTodo_sin_pagination()
    {
        return Trato_precio::orderBy('name')->get();
    }

    public function agregar(Request $rq)
    {
        $respuesta=false;
        try{
            if ($rq->nombre=='') {
                return ['codigo_respuesta'=>0,'nombre'=>"El nombre no puede estar vacio"];
            }
            $nombre=strtoupper($rq->nombre);
            $trato_precio = new Trato_precio;
            $trato_precio->name = $nombre;
            $trato_precio->save();
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
            $trato_precio = Trato_precio::find($rq->id);
            if($trato_precio->name==$rq->nombre){return ['codigo_respuesta'=>0,'nombre'=>"El estatus que desea editar ya tiene este nombre"]; }
            $trato_precio->name = $nombre;
            $trato_precio->save();
            $respuesta = ['codigo_respuesta'=>1,'nombre'=>"Estatus Modificado!"];//1 es true basicamente
            return  $respuesta;

        }catch(\Throwable $e){
            return ['codigo_respuesta'=>0,'nombre'=>"Ocurrio un error inesperado al editar el estatus"];
        }
    }
    public function buscar(Request $rq)
    {
        try{

            $nombre_trato_precio=$rq->nombre_trato_precio_buscar;
            
            $nombres    =   Trato_precio::where("name",'like',"%".$nombre_trato_precio."%")->orwhere("id",'like',"%".$nombre_trato_precio."%")->limit(10)->get();
         
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
                $respuesta = Trato_precio::where('id', $id)->delete();
                
            $respuesta = ['codigo_respuesta'=>1,'nombre'=>"Estatus Eliminado!"];//1 es true basicamente 0 es false
            return $respuesta;

            }
        } catch (\Throwable $th) {
            return ['codigo_respuesta'=>0,'nombre'=>"Ocurrio un error inesperado al eliminar la trato precio\n Es posible que el error se produce al borrar un registro relacionado"];
        }
    }
}
