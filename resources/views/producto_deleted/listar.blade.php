<div class="card">
    <div id="id-panel-producto-deleted" class="card-header text-center fondo-azul text-white">PRODUCTOS ELIMINADOS</div>


    <div class="w-80 p-3 row" >
      <div class="col-12">
        @include('producto_deleted.buscar')
      </div>
      <div class="col-2 ">
        <button onclick="llamarExcel()" class="btn btn-success">Exportar a Excel</button>
        
      </div>
      @if ($rol->elimina==1)
          
      {{-- <div class="col-3">
        <button type="button" id="eliminarMasivoProducto_eliminar_btn_id" class="btn btn-danger eliminar text-white">Eliminar Masivo</button>

      </div> --}}
      @endif
    </div>
    <div class="col-12">
        <small class="text-muted">La fecha de oferta se borra al eliminar el producto</small>

    </div>
    <div id="id-tabla-producto-deleted" class="card-body overflow-auto " style="height: 35em"> <!--Si es necesario hay que ajustar el scrolling en el js de producto--> 

        <table id="id_producto_deleted_tabla_completa"   class="table table-striped  lista">
            <thead >
              <tr>
                <th scope="col">ID CONVENIO MARCO</th>
                <th scope="col">DESCRIPCION</th>
                <th scope="col">P/N</th>
                <th scope="col">CATEGORIA</th>
                <th scope="col">MARCA</th>
                <th scope="col">PRIORIDAD</th>
                <th scope="col">ORIGEN</th>
                <th scope="col">ESTATUS</th>
                <th scope="col">COMENTARIO</th>
                <th scope="col">RESPONSABLE</th>
                <th scope="col">TRATO PRECIO</th>
                <th scope="col">PRECIO SUMATEC</th>
                <th scope="col">COSTO</th>
                <th scope="col">TRANSPORTE</th>
                <th scope="col">PRECIO COMPETENCIA</th>
                <th scope="col">MARGEN PRECIO</th>
                <th scope="col">MARGEN OFERTA</th>
                <th scope="col">TOPE OFERTA</th>
                <th scope="col">MARGEN TOPE OFERTA</th>
                <th scope="col">OFERTA</th>
                <th scope="col">NOTA</th>
                <th scope="col">FECHA INCIO OFERTA</th>
                <th scope="col">FECHA FIN OFERTA</th>
                <th scope="col">RESTAURAR</th>

                {{-- @isset($rol)
                @if ($rol->elimina==1)
                <th scope="col">ELIMINAR</th>
                    
                @endif
                    
                @endisset --}}
              </tr>
            </thead>
            <tbody id="id_tabla_cuerpo_producto" >
              
              <tr>
                <td scope='col'>...</td><td scope='col'>...</td>
                <td scope='col'>...</td><td scope='col'>...</td>
                <td scope='col'>...</td><td scope='col'>...</td>
                <td scope='col'>...</td><td scope='col'>...</td>
                <td scope='col'>...</td><td scope='col'>...</td>
                <td scope='col'>...</td><td scope='col'>...</td>
                <td scope='col'>...</td><td scope='col'>...</td>
                <td scope='col'>...</td><td scope='col'>...</td>
                <td scope='col'>...</td><td scope='col'>...</td>
                <td scope='col'>...</td><td scope='col'>...</td>
                <td scope='col'>...</td><td scope='col'>...</td>
                <td scope='col'>...</td>
                <td scope='col'>...</td>
                {{-- @isset($rol)
                    
                @if ($rol->elimina==1)
                <td scope='col'><button type='button' id='producto_eliminar_btn_id' class='btn btn-danger'> ELIMINAR</button></td>
                @endif
                @endisset --}}
              </tr>
              
            </tbody>
      </table>
      
    </div>
    
</div>