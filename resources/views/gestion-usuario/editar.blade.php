
<div class="card">
    <div class="card-header fondo-azul text-white text-center">Modificar Usuario</div>
    <form id="id_usuario_editar_form">

        <div class="card-body w-100">
            <input type="text" class="form-control" hidden id="usuario_editar_id" disabled name="usuario_editar_id" aria-describedby="h-usuario" placeholder="Haz click en la tabla">
            <table class="w-100">
                <tr>
                    <td>
                        <div class="form-group">
                            <label for="usuario_editar_nombre">Nombre Usuario</label>
                            <input type="text" class="form-control" id="usuario_editar_nombre" placeholder="Nombre Apellido">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="usuario_editar_correo">E-Mail</label>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">@</span>
                            </div>
                            <input type="email" class="form-control" id="usuario_editar_correo" placeholder="nombre@sumatec.cl" aria-label="nombre@sumatec.cl" aria-describedby="basic-addon1">
                            </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="form-group">
                            <label for="usuario_editar_clave">Contraseña</label>
                            <input autocomplete="off" type="text" class="form-control" id="usuario_editar_clave" placeholder="****">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="form-group">
                            <label for="usuario_editar_rol">Rol</label>
                            <select class="form-control " id="usuario_editar_rol">
                                <option>Cargando..</option>
                                </select>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary">MODIFICAR USUARIO</button>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </form>

</div>
