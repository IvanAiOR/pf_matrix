<?php

namespace App\Http\Controllers;
use App\Rol;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class rolController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $rol= DB::table('rol')->where('id',auth()->user()->rol_id)->get()[0];
        if ($rol->gestion_usuario==0) {//verificar si el usuario posee permisos para acceder a esta URL
            return \back();
        }
        return view('gestion-rol.main');
    }
    public function cargarTodo()
    {
        return Rol::orderBy('name')->paginate(10);
    }

    public function cargarFiltrado(Request $rq){

        return Rol::find(1)->cargarFiltro($rq->nombre)->paginate(15);

    }

    public function cargarTodo_sin_pagination()
    {
        return Rol::orderBy('name')->get();
    }

    public function agregar(Request $rq)
    {
        
        $respuesta=false;
        try{
            if ($rq->nombre=='') {
                return ['codigo_respuesta'=>0,'data'=>"El nombre no puede estar vacio"];
            }
            $nombre=strtoupper($rq->nombre);
            $rol = new Rol;
            $rol->name = $nombre;
            $rol->descripcion = $rq->descripcion;
            $rol->elimina = $rq->elimina;
            $rol->gestion_usuario = $rq->gestion_usuario;
            $rol->save();
            $respuesta = ['codigo_respuesta'=>1,'data'=>"Rol Agregado!"];//1 es true basicamente
            return  $respuesta;

        }catch(\Throwable $e){
            return ['codigo_respuesta'=>0,'data'=>"Ocurrio un error inesperado al registrar el rol"];
        }
    }
    public function editar(Request $rq)
    {
        
        // try{
            if ($rq->nombre=='') {
                return ['codigo_respuesta'=>0,'data'=>"El nombre no puede estar vacio"];
            }
            $nombre=strtoupper($rq->nombre);
            //die($rq->id);
            $rol = Rol::find($rq->id);
            //if($rol->name==$rq->nombre){return ['codigo_respuesta'=>0,'data'=>"El rol que desea editar ya tiene este nombre"]; }
            $rol->name = $nombre;
            $rol->descripcion = $rq->descripcion;
            $rol->elimina = $rq->elimina;
            $rol->gestion_usuario = $rq->gestion_usuario;
            $rol->gestion_parametros = $rq->gestion_parametros;
            $rol->save();
            $respuesta = ['codigo_respuesta'=>1,'data'=>"Rol Modificado!"];//1 es true basicamente
            return  $respuesta;

        // }catch(\Throwable $e){
        //     return ['codigo_respuesta'=>0,'data'=>"Ocurrio un error inesperado al editar El rol"];
        // }
    }
    public function buscar(Request $rq)
    {
        try{

            $nombre_rol=$rq->nombre_rol_buscar;
            
            $nombres = Rol::where("name",'like',"%".$nombre_rol."%")->orwhere("id",'like',"%".$nombre_rol."%")->limit(10)->get();
         
            return ['codigo_respuesta'=>1,'data'=>$nombres];
        }catch(\Exception $e){
            return ['codigo_respuesta'=>0,'data'=>"no hay resultados"];
        }
    }
    public function eliminar(Request $rq)
    {
        try {
            if($rq->id){
                $id=$rq->id;
                $respuesta = Rol::where('id', $id)->delete();
                
            $respuesta = ['codigo_respuesta'=>1,'data'=>"Rol Eliminado!"];//1 es true basicamente 0 es false
            return $respuesta;

            }
        } catch (\Throwable $th) {
            return ['codigo_respuesta'=>0,'data'=>"Ocurrio un error inesperado al eliminar el rol\n Es posible que el error se produce al borrar un registro relacionado"];
        }
    }

    public function cargarRol(Request $rq){
        try {
            
            return ["codigo_respuesta"=>1,"data"=>Rol::where('id',$rq->id)->get()];
        } catch (\Throwable $th) {
            return ["codigo_respuesta"=>0,"data"=>"Ocurrio un error al cargar el editar"];
        }
    }
}
