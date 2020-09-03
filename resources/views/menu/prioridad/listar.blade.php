<div class="card">
    <div id="id-panel-prioridad" class="card-header text-center fondo-azul text-white">LISTA DE PRIORIDAD</div>
    <div class="container">
      @include('menu.prioridad.buscar')
    </div>
    <div id="id-tabla-prioridad" class="card-body overflow-auto container" style="height: 35em">

        <table id="id_prioridad_tabla_completa" class="table lista">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">PRIORIDAD</th>
                @isset($rol)
                @if ($rol->elimina==1)
                <th scope="col">ELIMINAR</th>
                    
                @endif
                    
                @endisset
              </tr>
            </thead>
            <tbody id="id_tabla_cuerpo_prioridad" >
              
              <tr><td scope='col'>...</td><td scope='col'>...</td><td scope='col'><button type='button' id='prioridad_eliminar_btn_id' class='btn btn-danger'> ELIMINAR</button></td></tr>
              
            </tbody>
        </table>
        <div id="id-pagination">

        </div>
    </div>
</div>