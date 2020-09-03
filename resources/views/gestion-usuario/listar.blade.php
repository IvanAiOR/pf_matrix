<div class="card">
    <div class="card-header text-center fondo-azul text-white">LISTA DE USUARIOS</div>
    <div class="container">
      @include('gestion-usuario.buscar')
    </div>
    <div id="id-tabla-usuario" class="card-body overflow-auto container" style="height: 35em">

        <table id="id_usuario_tabla_completa" class="table lista">
            <thead>
              <tr>
                {{-- <th scope="col">ID</th> --}}
                <th scope="col">NOMRBE</th>
                <th scope="col">CORREO</th>
                <th scope="col">ROL</th>
                @isset($rol)
                @if ($rol->elimina==1)
                <th scope="col">ELIMINAR</th>
                    
                @endif
                    
                @endisset
              </tr>
            </thead>
            <tbody id="id_tabla_cuerpo_usuario" >
              
              <tr><td scope='col'>...</td><td scope='col'>...</td><td scope='col'>...</td><td scope='col'>...</td><td scope='col'><button type='button' id='usuario_eliminar_btn_id' class='btn btn-danger'> ELIMINAR</button></td></tr>
              
            </tbody>
        </table>
        <div id="id-pagination">

        </div>
    </div>
</div>