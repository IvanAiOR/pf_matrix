<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();


#rutas de usuario
Route::prefix('users/')->group(function(){

    Route::get('get-all-sin-filtro','userController@cargarTodo_sin_pagination')->name('user-todo-sin-filtro');
});

#ruta home
Route::get('home', 'HomeController@index')->name('home');

Route::prefix('home/')->group(function(){
    Route::post('ofertas-registradas','HomeController@ofertasrRegistradas');
    Route::post('ofertas-activas','HomeController@ofertasActivasDesdeHoy');
    Route::post('ofertas-activas-finaliza-en/{dias}','HomeController@OfertaFinalizaraEn');
    Route::post('reporte-producto-estatus','HomeController@repoteProductoEstatus');
    Route::post('reporte-producto-adherido-mes','HomeController@repoteProductoAdherido_mes');
    Route::post('reporte-producto-adherido-anio','HomeController@repoteProductoAdherido_anio');
    Route::post('reporte-producto-eliminados','HomeController@reporteProductosEliminados');
    Route::post('reporte-producto-categoria','HomeController@reporteProductosCategoria');
    Route::post('reporte-producto-habilitado','HomeController@reporteProductoHabilitado');
    Route::post('reporte-producto-ofertado','HomeController@productosOfertados');

});

#rutas de menu
Route::get('menu', 'menuController@index')->name('menu');
Route::name('menu', 'menuController@index')->name('menu');


#rutas de menu.marca
Route::prefix('marca/')->group(function(){
    
    Route::get ('/','marcasController@index')->name('marca');
    Route::get('get-all','marcasController@cargarTodo')->name('marca-todo');
    Route::get('get-all-sin-filtro','marcasController@cargarTodo_sin_pagination')->name('marca-todo-sin-filtro');
    
    Route::post('agregar','marcasController@agregar')->name('marca-agregar');
    Route::post('buscar/{nombre_marca_buscar}','marcasController@buscar')->name('marca-buscar');
    Route::post('editar','marcasController@editar')->name('marca-editar');
    Route::post('eliminar','marcasController@eliminar')->name('marca-eliminar');
}
    

);

#rutas de menu.categoria
Route::prefix('categoria/')->group(function(){
    Route::get('/','categoriaController@index')->name('categoria');

    Route::get('get-all','categoriaController@cargarTodo')->name('categoria-todo');
    Route::get('get-all-sin-filtro','categoriaController@cargarTodo_sin_pagination')->name('categoria-todo-sin-filtro');
    Route::post('agregar','categoriaController@agregar')->name('categoria-agregar');
    Route::post('buscar/{nombre_categoria_buscar}','categoriaController@buscar')->name('categoria-buscar');
    Route::post('editar','categoriaController@editar')->name('categoria-editar');
    Route::post('eliminar','categoriaController@eliminar')->name('categoria-eliminar');
}
);
   
#rutas de menu.origen
Route::prefix('origen/')->group(function(){//"Fix" debido a que no reconoce el controlador "origen", por falta de tiempo busque la solucion rapida que era reemplazar 
    Route::get('/','origenFixController@index')->name('origen');
    Route::get('get-all','origenFixController@cargarTodo')->name('origen-todo');
    
    Route::get('get-all-sin-filtro','origenFixController@cargarTodo_sin_pagination')->name('origen-todo-sin-filtro');
    Route::post('agregar','origenFixController@agregar')->name('origen-agregar');
    Route::post('buscar/{nombre_origen_buscar}','origenFixController@buscar')->name('origen-buscar');
    Route::post('editar','origenFixController@editar')->name('origen-editar');
    Route::post('eliminar','origenFixController@eliminar')->name('origen-eliminar');
}
);

#rutas de menu.prioridad
Route::prefix('prioridad/')->group(function(){
    Route::get('/','prioridadController@index')->name('prioridad');
    Route::get('get-all','prioridadController@cargarTodo')->name('prioridad-todo');
    Route::get('get-all-sin-filtro','prioridadController@cargarTodo_sin_pagination')->name('prioridad-todo-sin-filtro');
    
    Route::post('agregar','prioridadController@agregar')->name('prioridad-agregar');
    Route::post('buscar/{nombre_prioridad_buscar}','prioridadController@buscar')->name('prioridad-buscar');
    Route::post('editar','prioridadController@editar')->name('prioridad-editar');
    Route::post('eliminar','prioridadController@eliminar')->name('prioridad-eliminar');
}
    

);
#rutas de menu.estatus_cm
Route::prefix('estatus_cm/')->group(function(){
    Route::get('/','estatus_cmController@index')->name('estatus_cm');
    Route::get('get-all','estatus_cmController@cargarTodo')->name('estatus_cm-todo');
    Route::get('get-all-sin-filtro','estatus_cmController@cargarTodo_sin_pagination')->name('estatus_cm-todo-sin-filtro');
    
    Route::post('agregar','estatus_cmController@agregar')->name('estatus_cm-agregar');
    Route::post('buscar/{nombre_estatus_cm_buscar}','estatus_cmController@buscar')->name('estatus_cm-buscar');
    Route::post('editar','estatus_cmController@editar')->name('estatus_cm-editar');
    Route::post('eliminar','estatus_cmController@eliminar')->name('estatus_cm-eliminar');
}
    

);

#rutas de menu.comentario
Route::prefix('comentario/')->group(function(){
    Route::get('/','comentarioController@index')->name('comentario');
    Route::get('get-all','comentarioController@cargarTodo')->name('comentario-todo');
    Route::get('get-all-sin-filtro','comentarioController@cargarTodo_sin_pagination')->name('comentario-todo-sin-filtro');
    Route::post('agregar','comentarioController@agregar')->name('comentario-agregar');
    Route::post('buscar/{nombre_comentario_buscar}','comentarioController@buscar')->name('comentario-buscar');
    Route::post('editar','comentarioController@editar')->name('comentario-editar');
    Route::post('eliminar','comentarioController@eliminar')->name('comentario-eliminar');
}
);

#rutas de producto
Route::prefix('producto/')->group(function(){

    Route::get('/','productoController@index')->name('producto');
    Route::get('solo-filtro','productoController@indexFiltro')->name('producto-filtro');

    Route::get('get-all','productoController@cargarTodo')->name('producto-todo');
    Route::post('agregar','productoController@agregar')->name('producto-agregar');
    Route::post('buscar/{nombre_producto_buscar}','productoController@buscar')->name('producto-buscar');
    Route::post('editar','productoController@editar')->name('producto-editar');
    Route::post('eliminar','productoController@eliminar')->name('producto-eliminar');
    
    Route::post('buscar-uno/{id_cm}','productoController@buscarUno')->name('producto-buscar-uno');
    Route::post('rol-permiso-eliminar','productoController@validarRol')->name('producto-validar-rol');
    Route::post('filtro-avanzado','productoController@filtroProducto')->name('filtro-avanzado');
    Route::post('eliminar_masivo','productoController@eliminarMasivo');

}
);
#rutas de menu.nombre_origen
Route::prefix('nombre_origen/')->group(function(){
    Route::get('/','nombre_origenController@index')->name('nombre_origen');
    Route::get('get-all','nombre_origenController@cargarTodo')->name('nombre_origen-todo');
    Route::get('get-all-sin-filtro','nombre_origenController@cargarTodo_sin_pagination')->name('nombre_origen-todo-sin-filtro');
    
    Route::post('agregar','nombre_origenController@agregar')->name('nombre_origen-agregar');
    Route::post('buscar/{nombre_nombre_origen_buscar}','nombre_origenController@buscar')->name('nombre_origen-buscar');
    Route::post('editar','nombre_origenController@editar')->name('nombre_origen-editar');
    Route::post('eliminar','nombre_origenController@eliminar')->name('nombre_origen-eliminar');
}
);

#rutas de menu.trato_precio
Route::prefix('trato_precio/')->group(function(){
    Route::get('/','trato_precioController@index')->name('trato_precio');
    Route::get('get-all','trato_precioController@cargarTodo')->name('trato_precio-todo');
    Route::get('get-all-sin-filtro','trato_precioController@cargarTodo_sin_pagination')->name('trato_precio-todo-sin-filtro');
    
    Route::post('agregar','trato_precioController@agregar')->name('trato_precio-agregar');
    Route::post('buscar/{nombre_trato_precio_buscar}','trato_precioController@buscar')->name('trato_precio-buscar');
    Route::post('editar','trato_precioController@editar')->name('trato_precio-editar');
    Route::post('eliminar','trato_precioController@eliminar')->name('trato_precio-eliminar');
}
);

Route::prefix('usuario/')->group(function(){
    Route::get('/','gestionUsuarioController@index')->name('usuario');
    Route::get('get-all','gestionUsuarioController@cargarTodo')->name('usuario-todo');
    Route::get('get-all-sin-filtro','gestionUsuarioController@cargarTodo_sin_pagination')->name('usuario-todo-sin-filtro');
    
    Route::post('agregar','gestionUsuarioController@agregar')->name('usuario-agregar');
    Route::post('buscar/{nombre_usuario_buscar}','gestionUsuarioController@buscar')->name('usuario-buscar');
    Route::post('editar','gestionUsuarioController@editar')->name('usuario-editar');
    Route::post('eliminar','gestionUsuarioController@eliminar')->name('usuario-eliminar');
    Route::post('get-user','gestionUsuarioController@cargarUsuario')->name('usuario-cargar');
    Route::get('consulta-rol-permiso','gestionUsuarioController@rolPermiso')->name('consulta-rol-permiso');

});


#rutas de menu.origen
Route::prefix('rol/')->group(function(){//"Fix" debido a que no reconoce el controlador "rol", por falta de tiempo busque la solucion rapida que era reemplazar 
    Route::get('/','rolController@index')->name('rol');
    Route::get('get-all','rolController@cargarTodo')->name('rol-todo');
    
    Route::get('get-all-sin-filtro','rolController@cargarTodo_sin_pagination')->name('rol-todo-sin-filtro');
    Route::post('agregar','rolController@agregar')->name('rol-agregar');
    Route::post('buscar/{nombre_rol_buscar}','rolController@buscar')->name('rol-buscar');
    Route::post('editar','rolController@editar')->name('rol-editar');
    Route::post('eliminar','rolController@eliminar')->name('rol-eliminar');
    Route::post('get-rol','rolController@cargarRol')->name('rol-cargar');
    
}
);

Route::prefix('producto_deleted/')->group(function ()
{

    Route::get('/','productoDeletedController@index')->name('producto-deleted');
    Route::get('get-all','productoDeletedController@cargarTodo')->name('producto-deleted-todo');
    Route::post('buscar/{nombre_producto_buscar}','productoDeletedController@buscar')->name('producto-deleted-buscar');
    Route::post('restaurar','productoDeletedController@restaurarProducto')->name('producto-deleted-restaurar');

});

Route::prefix('importar/')->group(function ()
{
    Route::get('/','importarController@index')->name('importar');
    Route::post('extraer-info','importarController@importarInfo')->name('extraer');
    
});

Route::prefix('catalogo/')->group(function ()
{
    Route::get('/','generarCatalogoController@index')->name('catalogo');
    Route::post('catalogo','generarCatalogoController@generarCatalogo');
    Route::get('descargar','generarCatalogoController@descargar');
    
});