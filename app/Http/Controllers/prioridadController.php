<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Prioridad;
use Illuminate\Support\Facades\DB;

class prioridadController extends Controller
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
        return view('menu.prioridad.main');
    }

    public function cargarTodo()
    {
        return Prioridad::orderBy('name')->paginate(15);
    }

    public function cargarTodo_sin_pagination()
    {
        return Prioridad::orderBy('name')->get();
    }


    public function cargarFiltrado(Request $rq){

        return Prioridad::find(1)->cargarFiltro($rq->nombre)->paginate(15);

    }

    public function agregar(Request $rq)
    {
        $respuesta=false;
        try{
            if ($rq->nombre=='') {
                return ['codigo_respuesta'=>0,'nombre'=>"El nombre no puede estar vacio"];
            }
            $nombre=strtoupper($rq->nombre);
            $prioridad = new Prioridad;
            $prioridad->name = $nombre;
            $prioridad->save();
            $respuesta = ['codigo_respuesta'=>1,'nombre'=>"Prioridad Agregada!"];//1 es true basicamente
            return  $respuesta;

        }catch(\Throwable $e){
            return ['codigo_respuesta'=>0,'nombre'=>"Ocurrio un error inesperado al registrar la prioridad"];
        }
    }
    public function editar(Request $rq)
    {
        
        try{
            if ($rq->nombre=='') {
                return ['codigo_respuesta'=>0,'nombre'=>"El nombre no puede estar vacio"];
            }
            $nombre=strtoupper($rq->nombre);
            $prioridad = Prioridad::find($rq->id);
            if($prioridad->name==$rq->nombre){return ['codigo_respuesta'=>0,'nombre'=>"La prioridad que desea editar ya tiene este nombre"]; }
            $prioridad->name = $nombre;
            $prioridad->save();
            $respuesta = ['codigo_respuesta'=>1,'nombre'=>"Prioridad Modificada!"];//1 es true basicamente
            return  $respuesta;

        }catch(\Throwable $e){
            return ['codigo_respuesta'=>0,'nombre'=>"Ocurrio un error inesperado al editar la prioridad"];
        }
    }
    public function buscar(Request $rq)
    {
        try{

            $nombre_prioridad=$rq->nombre_prioridad_buscar;
            $nombres    =   Prioridad::where("name",'like',"%".$nombre_prioridad."%")->orwhere("id",'like',"%".$nombre_prioridad."%")->limit(10)->get();

         
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
                $respuesta = Prioridad::where('id', $id)->delete();
                
            $respuesta = ['codigo_respuesta'=>1,'nombre'=>"Prioridad Eliminada!"];//1 es true basicamente 0 es false
            return $respuesta;

            }
        } catch (\Throwable $th) {
            return ['codigo_respuesta'=>0,'nombre'=>"Ocurrio un error inesperado al eliminar la prioridad\n Es posible que el error se produce al borrar un registro relacionado"];
        }
    }
}
