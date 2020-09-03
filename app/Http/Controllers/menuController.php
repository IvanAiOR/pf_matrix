<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class menuController extends Controller
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
        if ($rol->gestion_parametros==0) {//verificar si el usuario posee permisos para acceder a esta URL
            return \back();
        }
        return view('menu.main');
    }
}
