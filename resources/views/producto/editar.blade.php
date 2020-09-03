
<div  id="producto_id_panel_editar" class="card shadow ">
    <div class="card-header text-center fondo-azul text-white">EDITAR PRODUCTO</div>

    <form id="id_producto_editar_form" onsubmit="editarProducto(event)">
        <input type="hidden" id="producto_editar_id_unico">
        <div class="card-body row col-md-12">
            @include('producto.editar-form.fila1')

            @include('producto.editar-form.fila2')

            @include('producto.editar-form.fila3')
            @include('producto.editar-form.fila4')
            
        
            <div class="col-md-12 row">
                
                <div class="col-md-3"></div>
                <button type="submit" id="producto_editar_btn_id" name="producto_editar_btn_id" class="btn btn-primary col-md-3">MODIFICAR REGISTRO</button>
                <div class="col-md-1"></div>
                <button type="button" id="producto_editar_btn_volver_agregar" class="btn btn-light col-md-3">Registrar un nuevo producto</button>
            </div>
        </div>
        <br>
    </form>

</div>
