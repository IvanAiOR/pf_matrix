<div class="card">
    <div class="card-header text-center fondo-azul text-white">EDITAR PRIORIDAD</div>

    <div class="card-body">
   
    <form id="id-prioridad-editar-form" method="POST" action="">
        @csrf
        <div class="form-group">
            <div class="form-group">
                <label for="">ID</label>
                <input type="text" class="form-control" id="id_prioridad_id_editar" disabled name="id_prioridad_id_editar" aria-describedby="h-prioridad" placeholder="Haz click en la tabla">
                <label for="">Marca</label>
                <input class="form-control" id="id_prioridad_nombre_editar" disabled name="id_prioridad_nombre_editar" aria-describedby="h-prioridad" placeholder="Modifica prioridad">
                <small id="h-prioridad" class="form-text text-muted">Una vez cargada la prioridad se habilitará este campo.</small>
              </div>
        </div>
        <button type="submit" class="btn btn-primary">EDITAR</button>
    </form>
        

    </div>
</div>