<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Marca;
use Illuminate\Support\Facades\DB;

class marcasController extends Controller
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
        return view('menu.marca.main');
    }

    public function cargarTodo()
    {
        return Marca::orderBy('name')->paginate(15);
    }

    public function cargarFiltrado(Request $rq){

        return Marca::find(1)->cargarFiltro($rq->nombre)->paginate(15);

    }

    public function cargarTodo_sin_pagination()
    {
        return Marca::orderBy('name')->get();
    }

    public function agregar(Request $rq)
    {
        $respuesta=false;
        try{
            if ($rq->nombre=='') {
                return ['codigo_respuesta'=>0,'nombre'=>"El nombre no puede estar vacio"];
            }
            $nombre=strtoupper($rq->nombre);
            $marca = new Marca;
            $marca->name = $nombre;
            $marca->save();
            $respuesta = ['codigo_respuesta'=>1,'nombre'=>"Marca Agregada!"];//1 es true basicamente
            return  $respuesta;

        }catch(\Throwable $e){
            return ['codigo_respuesta'=>0,'nombre'=>"Ocurrio un error inesperado al registrar la marca"];
        }
    }
    public function editar(Request $rq)
    {
        
        try{
            if ($rq->nombre=='') {
                return ['codigo_respuesta'=>0,'nombre'=>"El nombre no puede estar vacio"];
            }
            $nombre=strtoupper($rq->nombre);
            $marca = Marca::find($rq->id);
            if($marca->name==$rq->nombre){return ['codigo_respuesta'=>0,'nombre'=>"La marca que desea editar ya tiene este nombre"]; }
            $marca->name = $nombre;
            $marca->save();
            $respuesta = ['codigo_respuesta'=>1,'nombre'=>"Marca Modificada!"];//1 es true basicamente
            return  $respuesta;

        }catch(\Throwable $e){
            return ['codigo_respuesta'=>0,'nombre'=>"Ocurrio un error inesperado al editar la marca"];
        }
    }
    public function buscar(Request $rq)
    {
        try{

            $nombre_marca=$rq->nombre_marca_buscar;
            
            $nombres    =   Marca::where("name",'like',"%".$nombre_marca."%")->orwhere("id",'like',"%".$nombre_marca."%")->limit(10)->get();
         
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
                $respuesta = Marca::where('id', $id)->delete();
                
            $respuesta = ['codigo_respuesta'=>1,'nombre'=>"Marca Eliminada!"];//1 es true basicamente 0 es false
            return $respuesta;

            }
        } catch (\Throwable $th) {
            return ['codigo_respuesta'=>0,'nombre'=>"Ocurrio un error inesperado al eliminar la marca\n Es posible que el error se produce al borrar un registro relacionado"];
        }
    }
    
}
