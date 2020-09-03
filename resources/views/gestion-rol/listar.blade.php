<div class="card">
    <div id="id-panel-rol" class="card-header text-center fondo-azul text-white">LISTA DE ROL</div>
    <div class="container">
      @include('gestion-rol.buscar')
    </div>
    <div id="id-tabla-rol" class="card-body overflow-auto container" style="height: 35em">

        <table id="id_rol_tabla_completa" class="table lista table-striped">
            <thead>
              <tr>
                {{-- <th scope="col ">ID</th> --}}
                <th scope="col ">ROL</th>
                <th scope="col ">P.ELIMINAR</th>
                <th scope="col ">P.G.USUARIO</th>
                <th scope="col ">P.G.PARAMETROS</th>
                @isset($rol)
                @if ($rol->elimina==1)
                <th scope="col ">ELIMINAR</th>
                    
                @endif
                    
                @endisset
              </tr>
            </thead>
            <tbody id="id_tabla_cuerpo_rol" >
              
              <tr><td scope='col '>...</td><td scope='col '>...</td><td scope='col '><button type='button' id='rol_eliminar_btn_id' class='btn btn-danger'> ELIMINAR</button></td></tr>
              
            </tbody>
        </table>
        
        <div id="id-pagination">

        </div>
    </div>
    <div class="container">

      <small id="h-rol" class="form-text text-muted">P: Permiso, G: Gestión</small>
    </div>

</div>