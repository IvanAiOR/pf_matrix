<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Estatus_cm;
use Illuminate\Support\Facades\DB;

class estatus_cmController extends Controller
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
        return view('menu.estatus_cm.main');
    }

    public function cargarTodo()
    {
        return Estatus_cm::orderBy('name')->paginate(15);
    }

    public function cargarFiltrado(Request $rq){

        return Estatus_cm::find(1)->cargarFiltro($rq->nombre)->paginate(15);

    }

    public function cargarTodo_sin_pagination()
    {
        return Estatus_cm::orderBy('name')->get();
    }

    public function agregar(Request $rq)
    {
        $respuesta=false;
        try{
            if ($rq->nombre=='') {
                return ['codigo_respuesta'=>0,'nombre'=>"El nombre no puede estar vacio"];
            }
            $nombre=strtoupper($rq->nombre);
            $estatus_cm = new Estatus_cm;
            $estatus_cm->name = $nombre;
            $estatus_cm->save();
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
            $estatus_cm = Estatus_cm::find($rq->id);
            if($estatus_cm->name==$rq->nombre){return ['codigo_respuesta'=>0,'nombre'=>"El estatus que desea editar ya tiene este nombre"]; }
            $estatus_cm->name = $nombre;
            $estatus_cm->save();
            $respuesta = ['codigo_respuesta'=>1,'nombre'=>"Estatus Modificado!"];//1 es true basicamente
            return  $respuesta;

        }catch(\Throwable $e){
            return ['codigo_respuesta'=>0,'nombre'=>"Ocurrio un error inesperado al editar el estatus"];
        }
    }
    public function buscar(Request $rq)
    {
        try{

            $nombre_estatus_cm=$rq->nombre_estatus_cm_buscar;
            
            $nombres    =   Estatus_cm::where("name",'like',"%".$nombre_estatus_cm."%")->orwhere("id",'like',"%".$nombre_estatus_cm."%")->limit(10)->get();
         
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
                if ($rq->id==5) {
                    return ['codigo_respuesta'=>0,'nombre'=>"Este parametro no se puede eliminar debido a que afecta la funcion eliminar masivo"];
                    
                }  
                $respuesta = Estatus_cm::where('id', $id)->delete();
                
            $respuesta = ['codigo_respuesta'=>1,'nombre'=>"Estatus Eliminado!"];//1 es true basicamente 0 es false
            return $respuesta;

            }
        } catch (\Throwable $th) {
            return ['codigo_respuesta'=>0,'nombre'=>"Ocurrio un error inesperado al eliminar el estatus cm\n Es posible que el error se produce al borrar un registro relacionado"];
        }
    }
}
