<div class="card">
    <div id="id-panel-trato_precio" class="card-header text-center fondo-azul text-white">LISTA DE TRATO PRECIO</div>
    <div class="container">
      @include('menu.trato_precio.buscar')
    </div>
    <div id="id-tabla-trato_precio" class="card-body overflow-auto container" style="height: 35em">

        <table id="id_trato_precio_tabla_completa" class="table lista">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">TRATO PRECIO</th>
                @isset($rol)
                @if ($rol->elimina==1)
                <th scope="col">ELIMINAR</th>
                    
                @endif
                    
                @endisset
              </tr>
            </thead>
            <tbody id="id_tabla_cuerpo_trato_precio" >
              
              <tr><td scope='col'>...</td><td scope='col'>...</td><td scope='col'><button type='button' id='trato_precio_eliminar_btn_id' class='btn btn-danger'> ELIMINAR</button></td></tr>
              
            </tbody>
        </table>
        <div id="id-pagination">

        </div>
    </div>
</div>