<div class="card">
    <div class="card-header text-center fondo-azul text-white">EDITAR ESTATUS CM</div>

    <div class="card-body">
   
    <form id="id-estatus_cm-editar-form" method="POST" action="">
        @csrf
        <div class="form-group">
            <div class="form-group">
                <label for="">ID</label>
                <input type="text" class="form-control" id="id_estatus_cm_id_editar" disabled name="id_estatus_cm_id_editar" aria-describedby="h-estatus_cm" placeholder="Haz click en la tabla">
                <label for="">Estatus C.M.</label>
                <input class="form-control" id="id_estatus_cm_nombre_editar" disabled name="id_estatus_cm_nombre_editar" aria-describedby="h-estatus_cm" placeholder="Modifica Estatus C.M">
                <small id="h-estatus_cm" class="form-text text-muted">Una vez cargado el Estatus C.M. se habilitará este campo.</small>
              </div>
        </div>
        <button type="submit" class="btn btn-primary">EDITAR</button>
    </form>
        

    </div>
</div>