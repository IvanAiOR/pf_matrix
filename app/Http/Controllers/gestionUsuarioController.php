<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;


class gestionUsuarioController extends Controller
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
        $rol= DB::table('rol')->where('id',auth()->user()->rol_id)->get()[0];
        if ($rol->gestion_usuario==0) {//verificar si el usuario posee permisos para acceder a esta URL
            return \back();
        }
        return view('gestion-usuario.main');
    }

    public function agregar(Request $rq)
    {
        //die(strlen($rq->nombre)) ;
        //die($asd);
        try{
            if ($rq->nombre=='') {
                return ['codigo_respuesta'=>0,'data'=>"El nombre no puede estar vacio"];
            }

            if (strlen($rq->nombre)<=5) {
                return ['codigo_respuesta'=>0,'data'=>"El nombre debe ser de al menos 6 caracteres contando nombre, apellido y el espacio"];
            }
            // die((count(explode(" ", $rq->nombre))));
            $separadores = count(explode(" ", $rq->nombre));
            if ((count(explode(" ", $rq->nombre)))<2) {
                return ['codigo_respuesta'=>0,'data'=>"El nombre no debe contener nombre y apellido"];
            }
            //$nombre=strtoupper($rq->nombre);
            $insert=new User;
            $insert->name=$rq->nombre;
            $insert->email=$rq->email;
            $insert->password=Hash::make($rq->clave);
            $insert->rol_id=$rq->rol_id;
            $insert->save();
            $respuesta = ['codigo_respuesta'=>1,'data'=>"Usuario Agregado/a!"];//1 es true basicamente
            return  $respuesta;

        }catch(\Throwable $e){
            return ['codigo_respuesta'=>0,'data'=>"Ocurrio un error inesperado al registrar el usuario"];
        }
    }

    public function editar(Request $rq)
    {
        
        try{
            if (strlen($rq->nombre)<=5) {
                return ['codigo_respuesta'=>0,'data'=>"El nombre debe ser de al menos 6 caracteres contando nombre, apellido y el espacio"];
            }
            // die((count(explode(" ", $rq->nombre))));
            $separadores = count(explode(" ", $rq->nombre));
            if ((count(explode(" ", $rq->nombre)))<2) {
                return ['codigo_respuesta'=>0,'data'=>"El nombre no debe contener nombre y apellido"];
            }
            //$nombre=strtoupper($rq->nombre);
            $update = User::find($rq->id);
            //if($update->name==$rq->nombre){return ['codigo_respuesta'=>0,'data'=>"El usuario que desea editar ya tiene este nombre"]; }
            $update->name = $rq->nombre;
            $update->email=$rq->email;
            $update->password=Hash::make($rq->clave);
            $update->rol_id=$rq->rol_id;
            $update->save();
            $respuesta = ['codigo_respuesta'=>1,'data'=>"Usuario Modificado!"];//1 es true basicamente
            return  $respuesta;

        }catch(\Throwable $e){
            return ['codigo_respuesta'=>0,'data'=>"Ocurrio un error inesperado al editar el usuario, verifica que el correo no se encuentre registrado,\n el campo nombre tenga al menos 6 caracteres y al menos 1 nombre y 1 apellido"];
        }
    }

    public function eliminar(Request $rq)
    {
        
        try {
            if($rq->id){
                $id=$rq->id;
                $respuesta = User::where('id', $id)->delete();
                
            $respuesta = ['codigo_respuesta'=>1,'data'=>"Rol Eliminado!"];//1 es true basicamente 0 es false
            return $respuesta;

            }
        } catch (\Throwable $th) {
            return ['codigo_respuesta'=>0,'data'=>"Ocurrio un error inesperado al eliminar la categoria\n Es posible que el error se produce al borrar un registro relacionado"];
        }
    
    }


    public function cargarTodo()
    {
        $consulta= User::select("users.*",'rol.name as rol');
        $consulta->join("rol",'rol.id',"=","users.rol_id");
        $consulta->where("users.id","<>",auth()->user()->id);
        //$consulta->groupBy("users.*");;


        return $consulta->paginate(10);
    }
    public function rolPermiso()
    {
        // try {
            //$data = {"permisoEliminar"=>false,"permisoGU"=>false};
            $user_rol= DB::table('rol')->where('id',\auth()->user()->rol_id)->get()[0];
            //var_dump($user_rol->elimina);
            //die($user_rol->elimina);
            return ["codigo_respuesta"=>1,"data"=>["permisoEliminar"=>$user_rol->elimina ==1?true:false ,"permisoGU"=>$user_rol->gestion_usuario ==1?true:false]];
           
            //code...
        // } catch (\Throwable $th) {
           
        //     return;
        // }
    }

    public function buscar(Request $rq)
    {
        try{

            $clave=$rq->nombre_usuario_buscar;
            
            $nombres    =   User::where("users.name",'like',"%".$clave."%")
                                ->select("users.*",'rol.name as rol')
                                ->join("rol",'rol.id',"=","users.rol_id")
                                ->orwhere("users.email",'like',"%".$clave."%")->limit(10)->get();
         
            return ['codigo_respuesta'=>1,'data'=>$nombres];
        }catch(\Exception $e){
            return ['codigo_respuesta'=>0,'data'=>"no hay resultados"];
        }
    }
    public function cargarUsuario(Request $rq){
        try {
            //code...
            //die(User::where('id',$rq->id)->get());
            return ["codigo_respuesta"=>1,"data"=>User::where('id',$rq->id)->where("id","<>",auth()->user()->id)->get()];
        } catch (\Throwable $th) {
            return ["codigo_respuesta"=>0,"data"=>"Ocurrio un error al cargar el editar"];
            //throw $th;
        }
    }
}
