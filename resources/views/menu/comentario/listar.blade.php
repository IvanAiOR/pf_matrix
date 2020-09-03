<div class="card">
    <div id="id-panel-comentario" class="card-header text-center fondo-azul text-white">LISTA DE COMENTARIO</div>
    <div class="container">
      @include('menu.comentario.buscar')
    </div>
    <div id="id-tabla-comentario" class="card-body overflow-auto container" style="height: 35em">

        <table id="id_comentario_tabla_completa" class="table lista">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">COMENTARIO</th>
                @isset($rol)
                @if ($rol->elimina==1)
                <th scope="col">ELIMINAR</th>
                    
                @endif
                    
                @endisset
              </tr>
            </thead>
            <tbody id="id_tabla_cuerpo_comentario" >
              
              <tr><td scope='col'>...</td><td scope='col'>...</td><td scope='col'><button type='button' id='comentario_eliminar_btn_id' class='btn btn-danger'> ELIMINAR</button></td></tr>
              
            </tbody>
        </table>
        <div id="id-pagination">

        </div>
    </div>
</div>