<div class="card">
    <div class="card-header text-center fondo-azul text-white">EDITAR ORIGEN</div>

    <div class="card-body">
   
    <form id="id-origen-editar-form" method="POST" action="">
        @csrf
        <div class="form-group">
            <div class="form-group">
                <label for="">ID</label>
                <input type="text" class="form-control" id="id_origen_id_editar" disabled name="id_origen_id_editar" aria-describedby="h-origen" placeholder="Haz click en la tabla">
                <label for="">origen</label>
                <input class="form-control" id="id_origen_nombre_editar" disabled name="id_origen_nombre_editar" aria-describedby="h-origen" placeholder="Modifica origen">
                <small id="h-origen" class="form-text text-muted">Una vez cargado el origen se habilitará este campo.</small>
              </div>
        </div>
        <button type="submit" class="btn btn-primary">EDITAR</button>
    </form>
        

    </div>
</div>