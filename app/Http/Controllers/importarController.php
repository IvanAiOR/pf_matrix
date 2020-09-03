<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Excel;
use App\Producto_Importado;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class importarController extends Controller
{
    //
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
        return view('importar.main');
    }

    public function importarInfo(Request $rq)
    {
        //crea un aerchivo segun el archivo subido
        try {
            $validador= $rq->validate(
                [
                    'archivo_importar'=>'mimes:xlsx'
                ]
            );
        } catch (\Throwable $th) {
            return ['codigo_respuesta'=> 0,'data'=>"Verifica que el tipo de archivo excel tenga la extension xlsx. \n De lo contrario debes abrir el archivo y 'Guardar como' Libro de Excel"];
        }
        try {
            //code...
            $archivo = $rq->file('archivo_importar');
            $fecha_hora=date('Ymd_His');
            $nombre_archivo = $fecha_hora.'_'.$archivo->getClientOriginalName(); 
            $archivo->move(public_path('productos_importados'),$nombre_archivo);
            $respuesta = $this->ConvertirAJSON($nombre_archivo);
            //var_dump(File::delete(public_path("productos_importados").$nombre_archivo));
            //Storage::delete('productos_importados/'.$nombre_archivo);
            
            unlink(public_path('productos_importados/').$nombre_archivo);
            //die();
            return $respuesta;
        } catch (\Throwable $th) {
            //throw $th;
            return ['codigo_respuesta'=> 0,'data'=>"Se produjo un error al manipular el archivo, verifica que cumpla las condiciones de uso. \n Si el error persiste, favor comunicar al desarrollador "];

        }
        

    }

    private function ConvertirAJSON($nombre_archivo = '')
    {
        try {
            //code...
            $excelFile = public_path('productos_importados') .'/'. $nombre_archivo;
            //return $excelFile;
            $worksheet =  Excel::toCollection([], $excelFile);
            $lista=[];
            //Excel::import(new Producto_Importado, $excelFile);
            $lista_estatus=DB::select('select * from estatus_cm');
            $contador=0;
            for ($i=6; $i < count($worksheet[0]); $i++) {
                for ($j=0; $j < count($lista_estatus); $j++) { 
                    if ($lista_estatus[$j]->name==strtoupper($worksheet[0][$i][5])) {
                        # code...
                        $worksheet[0][$i][5]= $lista_estatus[$j]->id;
                        $id_estatus=$lista_estatus[$j]->id;
                        $contador++;
                        break ;
                    }
                }
                
                DB::update("update producto set estatus_cm_id = {$id_estatus} where id_CM = {$worksheet[0][$i][0]};");
                //array_push($lista,$worksheet[0][$i][5]);

                
            }
            
            //return [$lista,$lista_estatus];
            return ['codigo_respuesta'=> 1,'data'=> "Estatus de Convenio Marco Actualizado. Se actualizaron {$contador} registros"];
        } catch (\Throwable $th) {
            //throw $th;
            return ['codigo_respuesta'=> 0,'data'=> "Ocurrio un error al intentar transformar los valores de excel, favor comunicar al desarrollador"];

        }
        
    }
}
