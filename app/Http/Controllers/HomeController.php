<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }
    public function ofertasrRegistradas(Request $rq)
    {
        
        return $this->consultaOfertas(Carbon::today()->toDateString(),'>=');//retorna la fecha de termino de oferta mayor a hoy
        
    }
    public function OfertaFinalizaraEn(Request $rq)
    {
        if ($rq->dias>5) {
            return $this->consultaOfertas((Carbon::today())->add(6,'day')->toDateString(),'>=');//retorna la fecha de termino de oferta mayor a hoy
        }
        return $this->consultaOfertas((Carbon::today())->add($rq->dias,'day')->toDateString(),'=');//retorna la fecha de termino de oferta mayor a hoy
        
    }
    public function ofertasActivasDesdeHoy(Request $rq)
    {
        
        try {
            
            //$respuesta= DB::select( DB::raw('SELECT u.id, u.name AS responsable, COUNT(producto.id) AS ofertas_activas FROM producto JOIN  users AS u ON producto.responsable_id = u.id  WHERE producto.fecha_fin_oferta >= CURDATE() GROUP BY u.id, u.name'));
            $respuesta= DB::table('producto')
            ->join('users','producto.responsable_id', '=', 'users.id');
            $respuesta->select('users.id','users.name as responsable',DB::raw('COUNT(producto.id) AS ofertas_activas'),'users.fav_color');
            $respuesta->where('producto.fecha_fin_oferta','>=', Carbon::today()->toDateString());//esta consulta sirve para mysql, si se cambia la base de datos debe ser probado
            $respuesta->where('producto.fecha_inicio_oferta', '<=', Carbon::today()->toDateString());
            $respuesta->groupBy('users.fav_color');
            $respuesta->groupBy('users.id');
            $respuesta->groupBy('users.name');

            return ['codigo_respuesta'=>1,'nombre'=>$respuesta->get()];
        } catch (\Throwable $th) {
            return ['codigo_respuesta'=>0,'nombre'=>'Error al cargar el resumen de ofertas'];
        }
        
    }

    
    private function consultaOfertas($fecha_fin_oferta,$comparacion){
        # code...
        try {
            
            //$respuesta= DB::select( DB::raw('SELECT u.id, u.name AS responsable, COUNT(producto.id) AS ofertas_activas FROM producto JOIN  users AS u ON producto.responsable_id = u.id  WHERE producto.fecha_fin_oferta >= CURDATE() GROUP BY u.id, u.name'));
            $respuesta= DB::table('producto')
            ->join('users','producto.responsable_id', '=', 'users.id');
            $respuesta->select('users.id','users.name as responsable',DB::raw('COUNT(producto.id) AS ofertas_activas'),'users.fav_color');
            $respuesta->where('producto.fecha_fin_oferta',$comparacion, $fecha_fin_oferta);//esta consulta sirve para mysql, si se cambia la base de datos debe ser probado
            $respuesta->groupBy('users.fav_color');
            $respuesta->groupBy('users.id');
            $respuesta->groupBy('users.name');

            return ['codigo_respuesta'=>1,'nombre'=>$respuesta->get()];
        } catch (\Throwable $th) {
            return ['codigo_respuesta'=>0,'nombre'=>'Error al cargar el resumen de ofertas'];
        }
    }

    public function repoteProductoEstatus(){
        try {
            
            $consulta=DB::table('producto')
            ->join('estatus_cm','producto.estatus_cm_id', '=', 'estatus_cm.id');
            $consulta->select('estatus_cm.name', DB::raw('COUNT(producto.id) as cantidad'));
            $consulta->groupBy('estatus_cm.name');

         return ['codigo_respuesta'=>1,'nombre'=>$consulta->get()];
        } catch (\Throwable $th) {
            return ['codigo_respuesta'=>0,'nombre'=>'Error al cargar datos de estado producto'];
        }
    }


    public function repoteProductoAdherido_mes()
    {
        try{
        $consulta= DB::table('producto')
        ->join('users','producto.responsable_id', '=', 'users.id');
        $consulta->select('users.name as name',DB::raw('COUNT(producto.id) AS cantidad'));
        $consulta->where(DB::raw('MONTH(producto.created_at)'),DB::raw("MONTH(CURDATE())"));
        $consulta->where(DB::raw('YEAR(producto.created_at)'), DB::raw('YEAR(CURDATE())'));
        $consulta->groupBy('users.name');
        //die(json_encode($consulta->tosql()));
        return ['codigo_respuesta'=>1,'nombre'=>$consulta->get()];
        } catch (\Throwable $th) {
            return ['codigo_respuesta'=>0,'nombre'=>'Error al cargar datos de estado producto'];
        }
    }

    public function repoteProductoAdherido_anio()
    {
        try{
        $consulta= DB::table('producto')
        ->join('users','producto.responsable_id', '=', 'users.id');
        $consulta->select('users.name as name',DB::raw('COUNT(producto.id) AS cantidad'));
        //$consulta->where(DB::raw('MONTH(producto.created_at)'),DB::raw("MONTH(CURDATE())"));
        $consulta->where(DB::raw('YEAR(producto.created_at)'), DB::raw('YEAR(CURDATE())'));
        $consulta->groupBy('users.name');
        //die(json_encode($consulta->tosql()));
        return ['codigo_respuesta'=>1,'nombre'=>$consulta->get()];
        } catch (\Throwable $th) {
            return ['codigo_respuesta'=>0,'nombre'=>'Error al cargar datos de  producto adherido por año'];
        }
    }

    public function reporteProductosEliminados()
    {//el productos eliminados va a ser la diferencia entre uno y el otro
        try {
        $consulta= DB::table('producto_deleted');
        $consulta->select(DB::raw('COUNT(id) as cantidad'),DB::raw('"ELIMINADOS" as name'));
        return ['codigo_respuesta'=>1,'nombre'=>$consulta->get()];
        } catch (\Throwable $th) {
            return ['codigo_respuesta'=>0,'nombre'=>'Error al cargar datos de producto eliminado'];
        }
    }

    public function reporteProductosCategoria()
    {
        try {
            $consulta = DB::table('producto');
            $consulta->join('categoria', 'producto.categoria_id','=','categoria.id');
            $consulta->select(DB::raw('(SELECT COUNT(producto.id) FROM PRODUCTO JOIN CATEGORIA ON PRODUCTO.CATEGORIA_ID = CATEGORIA.ID JOIN ESTATUS_CM ON PRODUCTO.ESTATUS_CM_ID = ESTATUS_CM.ID WHERE categoria.name like "%licencia%" and estatus_cm.NAME not like "%deshabilitado%") AS CANTIDAD_LICENCIAS '),
            DB::raw('(SELECT COUNT(producto.id) FROM PRODUCTO JOIN CATEGORIA ON PRODUCTO.CATEGORIA_ID = CATEGORIA.ID JOIN ESTATUS_CM ON PRODUCTO.ESTATUS_CM_ID = ESTATUS_CM.ID WHERE categoria.name NOT like "%licencia%" AND estatus_cm.NAME not like "%deshabilitado%" ) AS CANTIDAD_HARDWARD'));
            $consulta->groupBy('CANTIDAD_LICENCIAS');
            return ['codigo_respuesta'=>1,'nombre'=>$consulta->get()];
            return $consulta->get();
        } catch (\Throwable $th) {
            die($th);//$consulta->get());
            return ['codigo_respuesta'=>0,'nombre'=>'Error al cargar datos de producto por licencia y hardward'];
            //throw $th;
        }
        
    }
    public function reporteProductoHabilitado()
    {
        try {
            $consulta = DB::table('producto');
            $consulta->join('estatus_cm','estatus_cm.id','=','producto.estatus_cm_id');
            $consulta->select(DB::raw('estatus_cm.name as nombre'),DB::raw('ROUND(( 100 /( SELECT COUNT(*) FROM producto  JOIN estatus_cm on estatus_cm.id = producto.estatus_cm_id WHERE estatus_cm.name NOT LIKE "%DESHABILITADO%") ) * COUNT(estatus_cm_id),2)  AS cantidad'));
            $consulta->where('estatus_cm.name', 'NOT LIKE','%DESHABILITADO%');
            $consulta->groupBy('estatus_cm.id','estatus_cm.name');
            return ['codigo_respuesta'=>1,'data'=>$consulta->get()];


        } catch (\Throwable $th) {
            return ['codigo_respuesta'=>0,'data'=>'Error al cargar los porcentaje de producto'];
            //throw $th;
        }
    }
    public function productosOfertados()
    {
        try {
            $consulta = DB::table('producto')->where(function($query){
                $query->where('fecha_fin_oferta','=',null)
                ->orwhere('fecha_fin_oferta','<=',((new Carbon('2000-01-01'))->toDateString()));
            });
            $consulta->select(DB::raw('"Nunca ofertados" as nombre'),DB::raw('COUNT(*) as cantidad'));
            $consulta2 = DB::table('producto')->select(DB::raw('"Sin ofertas activas" as nombe'),DB::raw('COUNT(*) AS cantidad'))
            ->where('fecha_fin_oferta','>',((new Carbon('2000-01-01'))->toDateString()))
            ->where('fecha_fin_oferta','<',((new Carbon())->toDateString()));
            $consulta3 = DB::table('producto')->select(DB::raw('"Oferta Activa" as nombree'),DB::raw('COUNT(*) AS cantidad'))->where('fecha_fin_oferta','>=',((new Carbon())->toDateString()))->where('fecha_inicio_oferta','<=',((new Carbon())->toDateString()));
            $consulta4 = DB::table('producto')->select(DB::raw('"Oferta Por Iniciar" as nombre'),DB::raw('COUNT(*) AS cantidad'))->where('fecha_fin_oferta','>',((new Carbon())->toDateString()))->where('fecha_inicio_oferta','>',((new Carbon())->toDateString()));
            $consulta->union($consulta2);
            $consulta->union($consulta3);
            $consulta->union($consulta4);
            return ['codigo_respuesta'=>1,'data'=>$consulta->get()];
        } catch (\Throwable $th) {
            return ['codigo_respuesta' =>0, 'data'=>"No se econtró información de productos nunca ofertados"];
        }
    }
}
