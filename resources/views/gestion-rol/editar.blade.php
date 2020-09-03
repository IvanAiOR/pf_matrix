<div class="card">
    <div class="card-header text-center fondo-azul text-white">EDITAR ROL</div>

    <div class="card-body">
   
    <form id="id-rol-editar-form" method="POST" action="">
        <div class="form-group">
            <input type="text" id="rol_editar_id" hidden>
            <div class="form-group">
                <label for="rol_editar_nombre">Nombre</label>
                <input type="text" class="form-control"  id="rol_editar_nombre" aria-describedby="h-rol" placeholder="Ingresa nuevo rol">
                <small id="h-rol" class="form-text text-muted">Recuerda revisar si el rol ya existe en la lista</small>
            </div>
            <div class="form-group">
                <label for="rol_editar_descripcion">Descripcion</label>
                <textarea type="text" class="form-control"  id="rol_editar_descripcion" aria-describedby="h-rol" placeholder="..."></textarea>
                <small id="h-rol" class="form-text text-muted">Recuerda revisar si el rol ya existe en la lista</small>
            </div>
            <div class="form-group">
                <label for="rol_editar_permiso_eliminar">Permiso para Eliminar</label>
                <select class="form-control " id="rol_editar_permiso_eliminar">
                    <option value="0">No</option>
                    <option value="1">Sí</option>
                </select>
                <small id="h-rol" class="form-text text-muted">Este usuario tendra permisos para eliminar todo lo que se encuentra dentro de la plataforma</small>
    
            </div>
            <div class="form-group">
                <label for="rol_editar_permiso_usuario">Permiso para Registrar Usuarios</label>
                <select class="form-control " id="rol_editar_permiso_usuario">
                    <option value="0">No</option>
                    <option value="1">Sí</option>
                </select>
            </div>
            <div class="form-group">
                <label for="rol_editar_permiso_parametros">Permiso para Gestionar Parametros</label>
                <select class="form-control " id="rol_editar_permiso_parametros">
                    <option value="0">No</option>
                    <option value="1">Sí</option>
                </select>
            </div>
        </div>
        <button type="submit" class="btn btn-primary">EDITAR</button>
    </form>
        

    </div>
</div>