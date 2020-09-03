<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Producto;
use App\producto_deleted;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class productoController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        // $var="hola";
        // return $var; 
        return view('producto.main');
    }

    public function cargarTodo()
    {
        $consulta=DB::table('producto')
        ->join('marca', 'producto.marca_id', '=', 'marca.id')
        ->join('categoria', 'producto.categoria_id', '=', 'categoria.id')
        ->leftjoin('users', 'producto.responsable_id', '=', 'users.id')
        ->join('origen', 'producto.origen_id', '=', 'origen.id')
        ->join('prioridad', 'producto.prioridad_id', '=', 'prioridad.id')
        ->join('comentario', 'producto.comentario_id', '=', 'comentario.id')
        ->join('nombre_origen', 'producto.nombre_origen_id', '=', 'nombre_origen.id')
        ->join('trato_precio', 'producto.trato_precio_id', '=', 'trato_precio.id')
        ->join('estatus_cm', 'producto.estatus_cm_id', '=', 'estatus_cm.id')
        ->select(
            'producto.*',
            'marca.name as marca' ,
         'categoria.name as categoria',
         'origen.name as origen',
         'prioridad.name as prioridad',
         'comentario.name as comentario',
         'nombre_origen.name as nombre_origen',
         'trato_precio.name as trato_precio',
         'estatus_cm.name as estatus_cm',
         'users.name as responsable')
         ->orderBy('id_cm', 'DESC')
         ->paginate(15)
         ;
        // die($consulta->tosql());
        return  $consulta;
            
    }

    public function cargarFiltrado(Request $rq){

        return Producto::find(1)->cargarFiltro($rq->nombre)->paginate(15);

    }

    public function agregar(Request $rq)
    {
        
        try{
            if ($rq->description=='') {
                return ['codigo_respuesta'=>0,'nombre'=>"La descripción no puede estar vacia!"];
            }
            //die($rq->fecha_inicio);
            
            //die($_fecha_inicio_oferta);
            $rq->validate([
                'producto_precio' => 'numeric|required',
                'producto_costo' => 'numeric|required'
            ]);
            $producto = new Producto;
            if($rq->oferta_real>0)
            {
                try {
                    //code...
                    $producto->fecha_inicio_oferta = new Carbon($rq->fecha_inicio);
                } catch (\Throwable $th) {
                    //throw $th;
                    return ['codigo_respuesta'=>0,'nombre'=>"Verifica de limpiar la oferta si es que no tiene"];

                }
                try {
                    //code...
                    $producto->fecha_fin_oferta = new Carbon($rq->fecha_fin);
                } catch (\Throwable $th) {
                    //throw $th;
                    return ['codigo_respuesta'=>0,'nombre'=>"Verifica de limpiar la oferta si es que no tiene"];

                }
            }
            else{
                $producto->fecha_inicio_oferta = null;
                $producto->fecha_fin_oferta = null;
            }
            //die("inicio: "+$producto->fecha_inicio_oferta+"fin: "+$producto->fecha_fin_oferta);
            if($rq->producto_precio<=0 || $rq->producto_costo<=0){
                return ['codigo_respuesta'=>0,'nombre'=>"Costo y precio del producto debe ser mayor a 0!"];
            }
            if (!ctype_digit($rq->id_cm)) {
                
                return ['codigo_respuesta'=>0,'nombre'=>"Verifica que el ID de convenio marco no contenga letras!"];
            }
            $producto->id_cm = $rq->id_cm;
            $user = auth()->user();
            $producto->usuario_id = $user->id;
            $producto->description = strtoupper($rq->description);
            $producto->part_number = strtoupper($rq->part_number);
            $producto->marca_id = $rq->id_marca;
            $producto->categoria_id = $rq->id_categoria;
            $producto->prioridad_id = $rq->id_prioridad;
            $producto->responsable_id = $rq->id_usuario;
            $producto->origen_id = $rq->id_origen;
            $producto->nombre_origen_id = $rq->id_nombre_origen;
            $producto->precio_sumatec = $rq->producto_precio;
            $producto->costo = $rq->producto_costo;
            $producto->transporte = $rq->producto_transporte;
            $producto->precio_competencia = $rq->precio_competencia;
            $producto->trato_precio_id = $rq->trato_precio;
            $producto->estatus_cm_id = $rq->id_estatus_cm;
            $producto->comentario_id = $rq->id_comentario;
            //los try catch son en caso de que el divisor sea 0
            

            try {
                //code...
                $producto->margen_precio = round(((($rq->producto_costo/($rq->producto_precio-$rq->producto_transporte))-1)*-1)*100,3);
            } catch (\Throwable $th) {
                //throw $th;
                $producto->margen_precio=0;
            }
            try {
                //code...
                $producto->margen_oferta = round(((($rq->producto_costo/($rq->oferta_real-$rq->producto_transporte))-1)*-1)*100,3);
            } catch (\Throwable $th) {
                $producto->margen_oferta =0;
            }
            $producto->tope_oferta = round($rq->producto_precio*0.95);

            $producto->oferta = $rq->oferta_real;
            $producto->nota_adicional = strtoupper($rq->nota_adicional);
            try {
                //code...
                $producto->margen_tope_oferta = round(((($rq->producto_costo/($producto->tope_oferta-$rq->producto_transporte))-1)*-1)*100,3);
            } catch (\Throwable $th) {
                //throw $th;
                $producto->margen_tope_oferta =0;
            }
            
            $minimo_margen_oferta=2;//cambiar aqui el margen minimo oferta segun sea necesario
            //die($producto->margen_oferta);
            if( $producto->margen_oferta<= $minimo_margen_oferta  && $rq->oferta_real!=0){
                return ['codigo_respuesta'=>0,'nombre'=>"El margen de oferta debe ser sobre el ".$minimo_margen_oferta."%"];

            }
            try{//si el producto seguarda intentará hacer una consulta para borrar el mismo producto por el id_cm
                DB::delete('delete from producto_deleted where producto_deleted.id_cm = ?', [$rq->id_cm]);
            }catch(\Throwable $e){
                return ['codigo_respuesta'=>0,'nombre'=>"Ocurrio un error al limpiar el registro de respaldo de archivos eliminados"];
                
            }
            $producto->save();
            $respuesta = ['codigo_respuesta'=>1,'nombre'=>"Producto Agregado!"];//1 es true basicamente correcto
            return  $respuesta;

        }catch(\Throwable $e){
            
            return ['codigo_respuesta'=>0,'nombre'=>"Ocurrio un error inesperado al registrar el producto \n puede que el producto ya haya sido registrado,\n revise la lista de productos"];
        }
    }
    public function editar(Request $rq)
    {
        
        // try{
            if ($rq->description=='') {
                return ['codigo_respuesta'=>0,'nombre'=>"La descripción no puede estar vacia!"];
            }
            //die($rq->fecha_inicio);
            
            //die($_fecha_inicio_oferta);
            $rq->validate([
                'producto_precio' => 'numeric|required',
                'producto_costo' => 'numeric|required'
            ]);
            $producto = Producto::find($rq->id_unico);
            // die($rq->id_unico);
            if($rq->oferta_real>0)
            {
                
                
                try {
                    //code...
                    $producto->fecha_inicio_oferta = new Carbon($rq->fecha_inicio);
                } catch (\Throwable $th) {
                    //throw $th;
                    return ['codigo_respuesta'=>0,'nombre'=>"Verifica de limpiar la oferta si es que no tiene"];

                }
                try {
                    //code...
                    $producto->fecha_fin_oferta = new Carbon($rq->fecha_fin);
                } catch (\Throwable $th) {
                    //throw $th;
                    return ['codigo_respuesta'=>0,'nombre'=>"Verifica de limpiar la oferta si es que no tiene"];

                }
                try {
                    //code...
                    
                    $producto->margen_oferta = round(((($rq->producto_costo/($rq->oferta_real-$rq->producto_transporte))-1)*-1)*100,3);
                    
                } catch (\Throwable $th) {
                    $producto->margen_oferta =0;
                }

                $minimo_margen_oferta=2;
                
                if( $producto->margen_oferta<= $minimo_margen_oferta && $rq->oferta_real!=0){
                    return ['codigo_respuesta'=>0,'nombre'=>"El margen de oferta debe ser sobre el ".$minimo_margen_oferta."%"];

                }
            }
            else{
                $producto->fecha_inicio_oferta = null;
                $producto->fecha_fin_oferta = null;
                $producto->margen_oferta =0;
            }
            //die("inicio: "+$producto->fecha_inicio_oferta+"fin: "+$producto->fecha_fin_oferta);
            $producto->id_cm = $rq->id_cm;
            $user = auth()->user();
            $producto->usuario_id = $user->id;
            $producto->description = strtoupper($rq->description);
            $producto->part_number = strtoupper($rq->part_number);
            $producto->marca_id = $rq->id_marca;
            $producto->categoria_id = $rq->id_categoria;
            $producto->prioridad_id = $rq->id_prioridad;
            $producto->responsable_id = $rq->id_usuario;
            $producto->origen_id = $rq->id_origen;
            $producto->nombre_origen_id = $rq->id_nombre_origen;
            $producto->precio_sumatec = $rq->producto_precio;
            $producto->costo = $rq->producto_costo;
            $producto->transporte = $rq->producto_transporte;
            $producto->precio_competencia = $rq->precio_competencia;
            $producto->trato_precio_id = $rq->trato_precio;
            $producto->estatus_cm_id = $rq->id_estatus_cm;
            $producto->comentario_id = $rq->id_comentario;
            //los try catch son en caso de que el divisor sea 0
            if (!ctype_digit($rq->id_cm)) {
                
                return ['codigo_respuesta'=>0,'nombre'=>"Verifica que el ID de convenio marco no contenga letras!"];
            }
            
            if($rq->producto_precio<=0 || $rq->producto_costo<=0){
                return ['codigo_respuesta'=>0,'nombre'=>"Costo y precio del producto debe ser mayor a 0!"];
            }

            try {
                //code...
                $producto->margen_precio = round(((($rq->producto_costo/($rq->producto_precio-$rq->producto_transporte))-1)*-1)*100,3);
                
            } catch (\Throwable $th) {
                //throw $th;
                $producto->margen_precio=0;
            }
            try {
                //code...
                
                $producto->margen_oferta = round(((($rq->producto_costo/($rq->oferta_real-$rq->producto_transporte))-1)*-1)*100,3);
                //die($producto->margen_oferta);
            } catch (\Throwable $th) {
                $producto->margen_oferta =0;
            }
            // if ($producto->margen_precio<=5) {
            //     # code...
            //     return ['codigo_respuesta'=>0,'nombre'=>"El margen de precio debe ser sobre el 5%"];

            // }
            //die($producto->margen_oferta);
            
            
            $producto->tope_oferta = round($rq->producto_precio*0.95);

            $producto->oferta = $rq->oferta_real;
            $producto->nota_adicional = strtoupper($rq->nota_adicional);
            try {
                //code...
                $producto->margen_tope_oferta = round(((($rq->producto_costo/($producto->tope_oferta-$rq->producto_transporte))-1)*-1)*100,3);
            } catch (\Throwable $th) {
                //throw $th;
                $producto->margen_tope_oferta =0;
            }

            //die($producto);
            $producto->save();
            $respuesta = ['codigo_respuesta'=>1,'nombre'=>"Producto Modificado!"];//1 es true basicamente correcto
            return  $respuesta;

        // }catch(\Throwable $e){
            
        //     return ['codigo_respuesta'=>0,'nombre'=>"Ocurrio un error inesperado al editar el producto,\n revise la lista de productos si es que el part number, id convenio marco sean unicos es el mismo"];
        // }
    }
    public function buscar(Request $rq)
    {
        try{

            $nombre_producto=$rq->nombre_producto_buscar;
             $nombres = DB::table('producto')
            ->join('marca', 'producto.marca_id', '=', 'marca.id')
            ->join('categoria', 'producto.categoria_id', '=', 'categoria.id')
            ->leftjoin('users', 'producto.responsable_id', '=', 'users.id')
            ->join('origen', 'producto.origen_id', '=', 'origen.id')
            ->join('prioridad', 'producto.prioridad_id', '=', 'prioridad.id')
            ->join('comentario', 'producto.comentario_id', '=', 'comentario.id')
            ->join('nombre_origen', 'producto.nombre_origen_id', '=', 'nombre_origen.id')
            ->join('trato_precio', 'producto.trato_precio_id', '=', 'trato_precio.id')
            ->join('estatus_cm', 'producto.estatus_cm_id', '=', 'estatus_cm.id')
            ->select(
            'producto.*',
            'marca.name as marca' ,
             'categoria.name as categoria',
             'origen.name as origen',
             'prioridad.name as prioridad',
             'comentario.name as comentario',
             'nombre_origen.name as nombre_origen',
             'trato_precio.name as trato_precio',
             'estatus_cm.name as estatus_cm',
             'users.name as responsable')
             ->where("description",'like',"%".$nombre_producto."%")
             ->orwhere("id_cm",'like',"%".$nombre_producto."%")
             ->orwhere("part_number",'like',"%".$nombre_producto."%")
             ->orwhere("users.name",'like',"%".$nombre_producto."%")
             ->orderBy('id_cm', 'DESC')
             ->limit(10)->get();

         
            return ['codigo_respuesta'=>1,'data'=>$nombres];
        }catch(\Exception $e){
            return ['codigo_respuesta'=>0,'nombre'=>"no hay resultados"];
        }
    }
    public function eliminar(Request $rq)
    {
        $user = auth()->user();
        try {
            $rol=DB::table('rol')->where('id',$user->rol_id)->get()[0];
            // die($rol);
            if($rol->elimina==0){
                return ['codigo_respuesta'=>0,'nombre'=> 'Usted no tiene permiso para realizar esta acción'];

            }   
        } catch (\Throwable $th) {
            //throw $th;
            return ['codigo_respuesta'=>0,'nombre'=> 'Usted no tiene permiso para realizar esta acción'];
            
        }
        try {
            if($rq->id){
                $id=$rq->id;
                try {
                    $producto_deleted = new producto_deleted;
                    $respuesta = json_decode(DB::table('producto')->select('*')->where('id',$id)->get())[0];//[0] es para que devuelva el objeto de la lista y el json_decode es para que la convierta en un objeto legible en php
                    
                    //die($respuesta->marca_id);

                    $producto_deleted->id_cm = $respuesta->id_CM;
                    //$producto_deleted->usuario_id = $respuesta->usuario_id;
                    $producto_deleted->description = $respuesta->description; 
                    $producto_deleted->part_number = $respuesta->part_number;
                    $producto_deleted->marca_id = $respuesta->marca_id; 
                    $producto_deleted->categoria_id = $respuesta->categoria_id;
                    $producto_deleted->prioridad_id = $respuesta->prioridad_id;
                    $producto_deleted->responsable_id = $respuesta->responsable_id;
                    $producto_deleted->origen_id = $respuesta->origen_id;
                    $producto_deleted->nombre_origen_id = $respuesta->nombre_origen_id; 
                    $producto_deleted->precio_sumatec = $respuesta->precio_sumatec;
                    $producto_deleted->costo = $respuesta->costo ;
                    $producto_deleted->transporte = $respuesta->transporte; 
                    $producto_deleted->precio_competencia = $respuesta->precio_competencia; 
                    $producto_deleted->trato_precio_id = $respuesta->trato_precio_id; 
                    $producto_deleted->estatus_cm_id = $respuesta->estatus_cm_id;
                    $producto_deleted->comentario_id = $respuesta->comentario_id;
                    $producto_deleted->margen_precio = $respuesta->margen_precio;
                    $producto_deleted->margen_oferta = $respuesta->margen_oferta;
                    $producto_deleted->tope_oferta = $respuesta->tope_oferta;
                    $producto_deleted->oferta = $respuesta->oferta;
                    $producto_deleted->nota_adicional = $respuesta->nota_adicional;
                    $producto_deleted->margen_tope_oferta = $respuesta->margen_tope_oferta;
                    $producto_deleted->margen_tope_oferta = $respuesta->margen_tope_oferta;
                    $producto_deleted->user_deleted = $user->name;
                    $producto_deleted->fecha_inicio_oferta = $respuesta->fecha_inicio_oferta;
                    $producto_deleted->fecha_fin_oferta = $respuesta->fecha_fin_oferta;
                    
                    //die($producto_deleted);
                    $producto_deleted->save();
        
                }catch (\Throwable $th) {
                    //throw $th;
                    return ['codigo_respuesta'=>0,'nombre'=>"Ocurrio un error inesperado al respladar el registro"];
                }
                $respuesta = Producto::where('id',$id);
                $respuesta->delete();

            $respuesta = ['codigo_respuesta'=>1,'nombre'=>"Producto Eliminado!"];//1 es true basicamente 0 es false
            return $respuesta;

            }
        } catch (\Throwable $th) {
            return ['codigo_respuesta'=>0,'nombre'=>"Ocurrio un error inesperado al eliminar el producto"];
        }
    }


    public function devuelveEditarPanel()
    {
        return view('producto.editar');
    }
    
    public function devuelveAgregarPanel()
    {
        return view('producto.agregar');
    }

    public function buscarUno(Request $rq)
    {
        try {
            $data = Producto::where("id_cm",'=',$rq->id_cm)->limit(1)->get();
            return ['codigo_respuesta'=>1,'nombre'=>$data];
        } catch (\Throwable $th) {
            //throw $th;
            return ['codigo_respuesta'=>0,'nombre'=>"no se logra encontrar el producto"];

        }
       
    }
    public function validarRol(Request $rq)
    {
        $validar=0;
        $user = auth()->user();
        ;
        if ($user->rol_id!=4) {
            
            $validar=1;
        }
        return $validar;
    }

    public function filtroProducto(Request $rq)
    {
        try {
            $consulta = DB::table('producto')
            ->join('marca', 'producto.marca_id', '=', 'marca.id')
            ->join('categoria', 'producto.categoria_id', '=', 'categoria.id')
            ->leftjoin('users', 'producto.responsable_id', '=', 'users.id')
            ->join('origen', 'producto.origen_id', '=', 'origen.id')
            ->join('prioridad', 'producto.prioridad_id', '=', 'prioridad.id')
            ->join('comentario', 'producto.comentario_id', '=', 'comentario.id')
            ->join('nombre_origen', 'producto.nombre_origen_id', '=', 'nombre_origen.id')
            ->join('trato_precio', 'producto.trato_precio_id', '=', 'trato_precio.id')
            ->join('estatus_cm', 'producto.estatus_cm_id', '=', 'estatus_cm.id')
            ->select(
            'producto.*',
            'marca.name as marca' ,
             'categoria.name as categoria',
             'origen.name as origen',
             'prioridad.name as prioridad',
             'comentario.name as comentario',
             'nombre_origen.name as nombre_origen',
             'trato_precio.name as trato_precio',
             'estatus_cm.name as estatus_cm',
             'users.name as responsable');
             
            if ($rq->id_marca) 
            {
                $consulta->where('marca_id',$rq->id_marca);
            }
            
            if ($rq->id_categoria) 
            {
                $consulta->where('categoria_id',$rq->id_categoria);
            }
            
            if ($rq->id_prioridad) 
            {
                $consulta->where('prioridad_id',$rq->id_prioridad); 
            }
            
            if ($rq->id_usuario) 
            {
                $consulta->where('responsable_id',$rq->id_usuario);
            }
            
            if ($rq->id_origen) 
            {
                $consulta->where('origen_id',$rq->id_origen);
            }
            
            if ($rq->id_nombre_origen) 
            {
                $consulta->where('nombre_origen_id',$rq->id_nombre_origen);
            }
            
            if ($rq->trato_precio) 
            {
                $consulta->where('trato_precio_id',$rq->trato_precio);
            }
            
            if ($rq->id_estatus_cm) 
            {
                $consulta->where('estatus_cm_id',$rq->id_estatus_cm);
            }

            if ($rq->id_comentario) 
            {
                $consulta->where('comentario_id',$rq->id_comentario);
            }

            if ($rq->precio_min) 
            {
                $consulta->where('precio_sumatec','>=',$rq->precio_min);
            }
            
            if ($rq->precio_max) 
            {
                if ($rq->precio_max>0) 
                {
                    
                    $consulta->where('precio_sumatec','<=',$rq->precio_max);
                }
            }
            if ($rq->tipo_oferta) {
                switch ($rq->tipo_oferta) {
                    case 1: //estos valores van relacionados con los radio buttons del filtro de producto
                        # code... 
                        $consulta->whereDate('fecha_fin_oferta','>=',Carbon::today()->toDateString());
                        $consulta->whereDate('fecha_inicio_oferta','<=',Carbon::today()->toDateString());

                        break;
                    case 2:
                        # code...
                        $consulta->where(function($query){
                            $query->where('fecha_fin_oferta','=',null)
                            ->orwhere('fecha_fin_oferta','<=',((new Carbon('2000-01-01'))->toDateString()));
                        });
                        
                        
                    break;
                    case 3:
                        # code...
                        $consulta->where(function($query){
                            $query->where('fecha_fin_oferta','<',Carbon::today()->toDateString())
                            ->where('fecha_fin_oferta','>',((new Carbon('2000-01-01'))->toDateString()));
                        });
                        // $consulta->whereDate('fecha_fin_oferta','<',Carbon::today()->toDateString());
                        // $consulta->orwhere('fecha_fin_oferta','>',((new Carbon('2000-01-01'))->toDateString()));

                        break;
                    
                    default:
                        # code...
                        break;
                }
                    
                
            }

            if ($rq->margen_oferta_minimo) {
                $consulta->where('margen_oferta','<=',$rq->margen_oferta_minimo);
                
            }
            
            if ($rq->filtro_fecha_inicio) {
                $consulta->whereDate('fecha_inicio_oferta', '=',((new Carbon($rq->filtro_fecha_inicio))->toDateString()));
            }

            if ($rq->filtro_fecha_fin) {
                //die($rq->filtro_fecha_fin);
                $consulta->whereDate('fecha_fin_oferta', '=',((new Carbon($rq->filtro_fecha_fin))->toDateString()));
                
            }

            
            if ($rq->fecha_rango_busqueda_desde) {
                if ($rq->tipo_oferta) {
                    $consulta->whereDate('fecha_fin_oferta', '>=',((new Carbon($rq->fecha_rango_busqueda_desde))->toDateString()));
                    
                }
                else{

                    $consulta->whereDate('fecha_inicio_oferta', '>=',((new Carbon($rq->fecha_rango_busqueda_desde))->toDateString()));
                }
            }
            if ($rq->fecha_rango_busqueda_hasta) {
                $consulta->whereDate('fecha_fin_oferta', '<=',((new Carbon($rq->fecha_rango_busqueda_hasta))->toDateString()));
            }

            if (strlen($consulta->get())<=0) {
                return ['codigo_respuesta'=>0,'nombre'=>"No hay registro con este filtro"];
            }
            //die(json_encode($consulta));
            $consulta->orderBy('id_cm', 'DESC');
            return ['codigo_respuesta'=>1,'nombre'=>$consulta->get()];
        } catch (\Throwable $th) {
            return ['codigo_respuesta'=>0,'nombre'=>"Ha ocurrido un error al filtrar los campos:"];
        }
            
    }

    public function eliminarMasivo(Request $rq)
    {
        $user = auth()->user();
        try{    
            try {
                $rol=DB::table('rol')->where('id',$user->rol_id)->get()[0];
                // die($rol);
                if($rol->elimina==0){
                    return ['codigo_respuesta'=>0,'nombre'=> 'Usted no tiene permiso para realizar esta acción'];
    
                }   
            } catch (\Throwable $th) {
                //throw $th;
                return ['codigo_respuesta'=>0,'nombre'=> 'Usted no tiene permiso para realizar esta acción'];
                
            }
            $respuesta = json_decode(DB::table('producto')->select('*')->where('estatus_cm_id',5)->get());//obtengo la lista de productos a eliminar
            
            //die($respuesta->marca_id);
            for ($i=0; $i < count($respuesta); $i++) { 
                //recorro la lista y agrego los productos a la tabla de productos eliminados
                $producto_deleted = new producto_deleted;
                $producto_deleted->id_cm = $respuesta[$i]->id_CM;
                //$producto_deleted->usuario_id = $respuesta[$i]->usuario_id;
                $producto_deleted->description = $respuesta[$i]->description; 
                $producto_deleted->part_number = $respuesta[$i]->part_number;
                $producto_deleted->marca_id = $respuesta[$i]->marca_id; 
                $producto_deleted->categoria_id = $respuesta[$i]->categoria_id;
                $producto_deleted->prioridad_id = $respuesta[$i]->prioridad_id;
                $producto_deleted->responsable_id = $respuesta[$i]->responsable_id;
                $producto_deleted->origen_id = $respuesta[$i]->origen_id;
                $producto_deleted->nombre_origen_id = $respuesta[$i]->nombre_origen_id; 
                $producto_deleted->precio_sumatec = $respuesta[$i]->precio_sumatec;
                $producto_deleted->costo = $respuesta[$i]->costo ;
                $producto_deleted->transporte = $respuesta[$i]->transporte; 
                $producto_deleted->precio_competencia = $respuesta[$i]->precio_competencia; 
                $producto_deleted->trato_precio_id = $respuesta[$i]->trato_precio_id; 
                $producto_deleted->estatus_cm_id = $respuesta[$i]->estatus_cm_id;
                $producto_deleted->comentario_id = $respuesta[$i]->comentario_id;
                $producto_deleted->margen_precio = $respuesta[$i]->margen_precio;
                $producto_deleted->margen_oferta = $respuesta[$i]->margen_oferta;
                $producto_deleted->tope_oferta = $respuesta[$i]->tope_oferta;
                $producto_deleted->oferta = $respuesta[$i]->oferta;
                $producto_deleted->nota_adicional = $respuesta[$i]->nota_adicional;
                $producto_deleted->margen_tope_oferta = $respuesta[$i]->margen_tope_oferta;
                $producto_deleted->margen_tope_oferta = $respuesta[$i]->margen_tope_oferta;
                $producto_deleted->user_deleted = $user->name;//quien fue el usuairo que solicito borrar todo
                $producto_deleted->fecha_inicio_oferta = $respuesta[$i]->fecha_inicio_oferta;
                $producto_deleted->fecha_fin_oferta = $respuesta[$i]->fecha_fin_oferta;
                $producto_deleted->save();

            }



            $delete = DB::table('producto')->where('estatus_cm_id',5);
            $delete->delete();

            return ['codigo_respuesta'=>1,'nombre'=>'Se eliminó todos los productos con estatus "Eliminado"'];
        }catch(Throwable $th){
            return ['codigo_respuesta'=>1,'nombre'=>'Ocurrio un error mientras se intentaba eliminar los productos con estatus elimnado, de forma masiva'];

        }
    }
}
