<div class="card">
    <div id="id-panel-estatus_cm" class="card-header text-center fondo-azul text-white">LISTA DE ESTATUS CM</div>
    <div class="container">
      @include('menu.estatus_cm.buscar')
    </div>
    <div id="id-tabla-estatus_cm" class="card-body overflow-auto container" style="height: 35em">

        <table id="id_estatus_cm_tabla_completa" class="table lista">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">ESTATUS CM</th>
                @isset($rol)
                @if ($rol->elimina==1)
                <th scope="col">ELIMINAR</th>
                    
                @endif
                    
                @endisset
              </tr>
            </thead>
            <tbody id="id_tabla_cuerpo_estatus_cm" >
              
              <tr><td scope='col'>...</td><td scope='col'>...</td><td scope='col'><button type='button' id='estatus_cm_eliminar_btn_id' class='btn btn-danger'> ELIMINAR</button></td></tr>
              
            </tbody>
        </table>
        <div id="id-pagination">

        </div>
    </div>
</div>