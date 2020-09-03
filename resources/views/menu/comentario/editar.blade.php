<div class="card">
    <div class="card-header text-center fondo-azul text-white">EDITAR COMENTARIO</div>

    <div class="card-body">
   
    <form id="id-comentario-editar-form" method="POST" action="">
        @csrf
        <div class="form-group">
            <div class="form-group">
                <label for="">ID</label>
                <input type="text" class="form-control" id="id_comentario_id_editar" disabled name="id_comentario_id_editar" aria-describedby="h-comentario" placeholder="Haz click en la tabla">
                <label for="">comentario</label>
                <input class="form-control" id="id_comentario_nombre_editar" disabled name="id_comentario_nombre_editar" aria-describedby="h-comentario" placeholder="Modifica comentario">
                <small id="h-comentario" class="form-text text-muted">Una vez cargado el comentario se habilitará este campo.</small>
              </div>
        </div>
        <button type="submit" class="btn btn-primary">EDITAR</button>
    </form>
        

    </div>
</div>