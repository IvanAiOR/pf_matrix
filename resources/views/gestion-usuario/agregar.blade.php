
<div class="card">
    <div class="card-header fondo-azul text-white text-center">Registrar Usuario</div>
    <form id="id_usuario_agregar_form">

        <div class="card-body w-100">
            <table class="w-100">
                <tr>
                    <td>
                        <div class="form-group">
                            <label for="usuario_agregar_nombre">Nombre Usuario</label>
                            <input type="text" class="form-control" id="usuario_agregar_nombre" placeholder="Nombre Apellido">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="usuario_agregar_correo">E-Mail</label>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">@</span>
                            </div>
                            <input type="email" class="form-control" id="usuario_agregar_correo" placeholder="nombre@sumatec.cl" aria-label="nombre@sumatec.cl" aria-describedby="basic-addon1">
                            </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="form-group">
                            <label for="usuario_agregar_clave">Contraseña</label>
                            <input autocomplete="off" type="text" class="form-control" id="usuario_agregar_clave" placeholder="****">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="form-group">
                            <label for="usuario_agregar_rol">Rol</label>
                            <select class="form-control " id="usuario_agregar_rol">
                                <option>Cargando..</option>
                                </select>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary">AGREGAR USUARIO</button>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </form>

</div>
