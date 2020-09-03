<div class="card">
    <div class="card-header text-center fondo-azul text-white">EDITAR TRATO PRECIO</div>

    <div class="card-body">
   
    <form id="id-trato_precio-editar-form" method="POST" action="">
        @csrf
        <div class="form-group">
            <div class="form-group">
                <label for="">ID</label>
                <input type="text" class="form-control" id="id_trato_precio_id_editar" disabled name="id_trato_precio_id_editar" aria-describedby="h-trato_precio" placeholder="Haz click en la tabla">
                <label for="">Trato Precio</label>
                <input class="form-control" id="id_trato_precio_nombre_editar" disabled name="id_trato_precio_nombre_editar" aria-describedby="h-trato_precio" placeholder="Modifica Trato precio">
                <small id="h-trato_precio" class="form-text text-muted">Una vez cargado el Trato de precio se habilitará este campo.</small>
              </div>
        </div>
        <button type="submit" class="btn btn-primary">EDITAR</button>
    </form>
        

    </div>
</div>