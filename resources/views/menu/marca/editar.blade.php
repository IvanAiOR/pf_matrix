<div class="card">
    <div class="card-header text-center fondo-azul text-white">EDITAR MARCA</div>

    <div class="card-body">
   
    <form id="id-marca-editar-form" method="POST" action="">
        @csrf
        <div class="form-group">
            <div class="form-group">
                <label for="">ID</label>
                <input type="text" class="form-control" id="id_marca_id_editar" disabled name="id_marca_id_editar" aria-describedby="h-marca" placeholder="Haz click en la tabla">
                <label for="">Marca</label>
                <input class="form-control" id="id_marca_nombre_editar" disabled name="id_marca_nombre_editar" aria-describedby="h-marca" placeholder="Modifica marca">
                <small id="h-marca" class="form-text text-muted">Una vez cargada la marca se habilitará este campo.</small>
              </div>
        </div>
        <button type="submit" class="btn btn-primary">EDITAR</button>
    </form>
        

    </div>
</div>