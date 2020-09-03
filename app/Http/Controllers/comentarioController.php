<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comentario;
use Illuminate\Support\Facades\DB;

class comentarioController extends Controller
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
    public function index(){
        $rol= DB::table('rol')->where('id',auth()->user()->rol_id)->get()[0];
        if ($rol->gestion_parametros==0) {//verificar si el usuario posee permisos para acceder a esta URL
            return \back();
        }
        return view('menu.comentario.main');
    }
    
    public function cargarTodo()
    {
        return Comentario::orderBy('name')->paginate(15);
    }

    public function cargarFiltrado(Request $rq){

        return Comentario::find(1)->cargarFiltro($rq->nombre)->paginate(15);

    }

    public function cargarTodo_sin_pagination()
    {
        return Comentario::orderBy('name')->get();
    }

    public function agregar(Request $rq)
    {
        $respuesta=false;
        try{
            if ($rq->nombre=='') {
                return ['codigo_respuesta'=>0,'nombre'=>"El nombre no puede estar vacio"];
            }
            $nombre=strtoupper($rq->nombre);
            $comentario = new Comentario;
            $comentario->name = $nombre;
            $comentario->save();
            $respuesta = ['codigo_respuesta'=>1,'nombre'=>"Comentario Agregado!"];//1 es true basicamente
            return  $respuesta;

        }catch(\Throwable $e){
            return ['codigo_respuesta'=>0,'nombre'=>"Ocurrio un error inesperado al registrar el comentario"];
        }
    }
    public function editar(Request $rq)
    {
        
        try{
            if ($rq->nombre=='') {
                return ['codigo_respuesta'=>0,'nombre'=>"El nombre no puede estar vacio"];
            }
            $nombre=strtoupper($rq->nombre);
            $comentario = Comentario::find($rq->id);
            if($comentario->name==$rq->nombre){return ['codigo_respuesta'=>0,'nombre'=>"El comentario que desea editar ya tiene este nombre"]; }
            $comentario->name = $nombre;
            $comentario->save();
            $respuesta = ['codigo_respuesta'=>1,'nombre'=>"Comentario Modificado!"];//1 es true basicamente
            return  $respuesta;

        }catch(\Throwable $e){
            return ['codigo_respuesta'=>0,'nombre'=>"Ocurrio un error inesperado al editar el comentario"];
        }
    }
    public function buscar(Request $rq)
    {
        try{

            $nombre_comentario=$rq->nombre_comentario_buscar;
            
            $nombres    =   Comentario::where("name",'like',"%".$nombre_comentario."%")->orwhere("id",'like',"%".$nombre_comentario."%")->limit(10)->get();
         
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
                $respuesta = Comentario::where('id', $id)->delete();
                
            $respuesta = ['codigo_respuesta'=>1,'nombre'=>"Comentario Eliminado!"];//1 es true basicamente 0 es false
            return $respuesta;

            }
        } catch (\Throwable $th) {
            return ['codigo_respuesta'=>0,'nombre'=>"Ocurrio un error inesperado al eliminar el comentario\n Es posible que el error se produce al borrar un registro relacionado"];
        }
    }
}
