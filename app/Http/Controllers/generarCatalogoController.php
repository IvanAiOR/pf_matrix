<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Exports\CatalogoExport;
use Maatwebsite\Excel\Facades\Excel;

class generarCatalogoController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function index(){
        return view('catalogo.main');
    }

    public function generarCatalogo(){
        try {
            $consulta = DB::table('producto');
            $consulta->leftjoin('categoria','producto.categoria_id','=','categoria.id');
            $consulta->leftjoin('marca','producto.marca_id','=','marca.id');
            $consulta->leftjoin('estatus_cm','producto.estatus_cm_id','=','estatus_cm.id');
            $consulta->select('categoria.name as categoria','marca.name as marca','description','part_number','id_CM as id_cm');
            $consulta->where('estatus_cm.name','not like','%deshabilitado%');
            $consulta->orderby('categoria.name');
            // return Excel::download($consulta->get(), 'users.xlsx');
            return ['codigo_respuesta'=> 1,'data'=> $consulta->get()];
            
        } catch (\Throwable $th) {
            return ['codigo_respuesta'=> 0,'data'=> 'Ocurrio un error al crear el catalogo, avisa a los desarrolladores'];
            
        }
    }
    public function descargar(){
        // try {
            // $consulta = DB::table('producto');
            // $consulta->leftjoin('categoria','producto.categoria_id','=','categoria.id');
            // $consulta->leftjoin('marca','producto.marca_id','=','marca.id');
            // $consulta->leftjoin('estatus_cm','producto.estatus_cm_id','=','estatus_cm.id');
            // $consulta->select('categoria.name as categoria','marca.name as marca','description','part_number','id_CM as id_cm');
            // $consulta->where('estatus_cm.name','not like','%deshabilitado%');
            // $consulta->orderby('categoria.name');
            // return Excel::download($consulta->get(), 'users.xlsx');

            return Excel::download(new CatalogoExport, 'Catálogo.xlsx');
            
        // } catch (\Throwable $th) {
        //     return ['codigo_respuesta'=> 0,'data'=> 'Ocurrio un error al crear el catalogo, avisa a los desarrolladores'];
            
        // }
    }
}
