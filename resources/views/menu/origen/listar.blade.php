<div class="card">
    <div id="id-panel-origen" class="card-header text-center fondo-azul text-white">LISTA DE ORIGEN</div>
    <div class="container">
      @include('menu.origen.buscar')
    </div>
    <div id="id-tabla-origen" class="card-body overflow-auto container" style="height: 35em">

        <table id="id_origen_tabla_completa" class="table lista">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">ORIGEN</th>
                @isset($rol)
                @if ($rol->elimina==1)
                <th scope="col">ELIMINAR</th>
                    
                @endif
                    
                @endisset
              </tr>
            </thead>
            <tbody id="id_tabla_cuerpo_origen" >
              
              <tr><td scope='col'>...</td><td scope='col'>...</td><td scope='col'><button type='button' id='origen_eliminar_btn_id' class='btn btn-danger'> ELIMINAR</button></td></tr>
              
            </tbody>
        </table>
        <div id="id-pagination">

        </div>
    </div>
</div>