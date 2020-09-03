<div class="card">
    <div class="card-header text-center fondo-azul text-white">EDITAR CATEGORIA</div>

    <div class="card-body">
   
    <form id="id-categoria-editar-form" method="POST" action="">
        @csrf
        <div class="form-group">
            <div class="form-group">
                <label for="">ID</label>
                <input type="text" class="form-control" id="id_categoria_id_editar" disabled name="id_categoria_id_editar" aria-describedby="h-categoria" placeholder="Haz click en la tabla">
                <label for="">categoria</label>
                <input class="form-control" id="id_categoria_nombre_editar" disabled name="id_categoria_nombre_editar" aria-describedby="h-categoria" placeholder="Modifica categoria">
                <small id="h-categoria" class="form-text text-muted">Una vez cargada la categoria se habilitará este campo.</small>
              </div>
        </div>
        <button type="submit" class="btn btn-primary">EDITAR</button>
    </form>
        

    </div>
</div>