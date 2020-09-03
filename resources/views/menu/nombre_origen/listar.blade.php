<div class="card">
    <div id="id-panel-nombre_origen" class="card-header text-center fondo-azul text-white">LISTA DE NOMBRE ORIGEN</div>
    <div class="container">
      @include('menu.nombre_origen.buscar')
    </div>
    <div id="id-tabla-nombre_origen" class="card-body overflow-auto container" style="height: 35em">

        <table id="id_nombre_origen_tabla_completa" class="table lista">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">NOMBRE ORIGEN</th>
                @isset($rol)
                @if ($rol->elimina==1)
                <th scope="col">ELIMINAR</th>
                    
                @endif
                    
                @endisset
              </tr>
            </thead>
            <tbody id="id_tabla_cuerpo_nombre_origen" >
              
              <tr><td scope='col'>...</td><td scope='col'>...</td><td scope='col'><button type='button' id='nombre_origen_eliminar_btn_id' class='btn btn-danger'> ELIMINAR</button></td></tr>
              
            </tbody>
        </table>
        <div id="id-pagination">

        </div>
    </div>
</div>