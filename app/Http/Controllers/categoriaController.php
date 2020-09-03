<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Categoria;
use Illuminate\Support\Facades\DB;


class categoriaController extends Controller
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
        return view('menu.categoria.main');
    }

    public function cargarTodo()
    {
        return Categoria::orderBy('name')->paginate(15);
    }

    public function cargarTodo_sin_pagination()
    {
        return Categoria::orderBy('name')->get();
    }


    public function cargarFiltrado(Request $rq){

        return Categoria::find(1)->cargarFiltro($rq->nombre)->paginate(15);

    }

    public function agregar(Request $rq)
    {
        $respuesta=false;
        try{
            if ($rq->nombre=='') {
                return ['codigo_respuesta'=>0,'nombre'=>"El nombre no puede estar vacio"];
            }
            $nombre=strtoupper($rq->nombre);
            $categoria = new Categoria;
            $categoria->name = $nombre;
            $categoria->save();
            $respuesta = ['codigo_respuesta'=>1,'nombre'=>"Categoria Agregada!"];//1 es true basicamente
            return  $respuesta;

        }catch(\Throwable $e){
            return ['codigo_respuesta'=>0,'nombre'=>"Ocurrio un error inesperado al registrar la categoria"];
        }
    }
    public function editar(Request $rq)
    {
        
        try{
            if ($rq->nombre=='') {
                return ['codigo_respuesta'=>0,'nombre'=>"El nombre no puede estar vacio"];
            }
            $nombre=strtoupper($rq->nombre);
            $categoria = Categoria::find($rq->id);
            if($categoria->name==$rq->nombre){return ['codigo_respuesta'=>0,'nombre'=>"La categoria que desea editar ya tiene este nombre"]; }
            $categoria->name = $nombre;
            $categoria->save();
            $respuesta = ['codigo_respuesta'=>1,'nombre'=>"Categoria Modificada!"];//1 es true basicamente
            return  $respuesta;

        }catch(\Throwable $e){
            return ['codigo_respuesta'=>0,'nombre'=>"Ocurrio un error inesperado al editar la categoria"];
        }
    }
    public function buscar(Request $rq)
    {
        try{

            $nombre_categoria=$rq->nombre_categoria_buscar;
            $nombres    =   Categoria::where("name",'like',"%".$nombre_categoria."%")->orwhere("id",'like',"%".$nombre_categoria."%")->limit(10)->get();

         
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
                $respuesta = Categoria::where('id', $id)->delete();
                
            $respuesta = ['codigo_respuesta'=>1,'nombre'=>"Categoria Eliminada!"];//1 es true basicamente 0 es false
            return $respuesta;

            }
        } catch (\Throwable $th) {
            return ['codigo_respuesta'=>0,'nombre'=>"Ocurrio un error inesperado al eliminar la categoria\n Es posible que el error se produce al borrar un registro relacionado"];
        }
    }
}
