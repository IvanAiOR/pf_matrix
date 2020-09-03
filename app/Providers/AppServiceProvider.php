<?php

namespace App\Providers;
use App\Producto;
use App\Observers\ProductoObserver;
use Illuminate\Support\Facades\DB;


use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
        Producto::observe(ProductoObserver::class);
        
        view()->composer('*', function ($view) {
            //die(json_encode(auth()->user()));
            if (isset(auth()->user()->rol_id)) {//el isset de rol id debe ser dentro de la vista, de lo contrario no toma en cuenta si se esta autentificando o no
                //$user=DB::table('users')->
                $rol= DB::table('rol')->where('id',auth()->user()->rol_id)->get()[0];
                //die(json_encode($rol));
                $view->with('rol',$rol);
            }
        });
    }
}
