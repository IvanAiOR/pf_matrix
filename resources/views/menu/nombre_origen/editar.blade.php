<div class="card">
    <div class="card-header text-center fondo-azul text-white">EDITAR NOMBRE ORIGEN</div>

    <div class="card-body">
   
    <form id="id-nombre_origen-editar-form" method="POST" action="">
        @csrf
        <div class="form-group">
            <div class="form-group">
                <label for="">ID</label>
                <input type="text" class="form-control" id="id_nombre_origen_id_editar" disabled name="id_nombre_origen_id_editar" aria-describedby="h-nombre_origen" placeholder="Haz click en la tabla">
                <label for="">Nombre Origen</label>
                <input class="form-control" id="id_nombre_origen_nombre_editar" disabled name="id_nombre_origen_nombre_editar" aria-describedby="h-nombre_origen" placeholder="Modifica Nombre de Origen">
                <small id="h-nombre_origen" class="form-text text-muted">Una vez cargado el Nombre de origen se habilitará este campo.</small>
              </div>
        </div>
        <button type="submit" class="btn btn-primary">EDITAR</button>
    </form>
        

    </div>
</div>