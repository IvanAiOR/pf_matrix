
<div  id="producto_id_panel_agregar" class="card shadow ">
    <div class="card-header text-center fondo-azul text-white">AGREGAR PRODUCTO</div>

    <form id="id_producto_agregar_form" onsubmit="agregarProducto(event)" >
    <div class="card-body row">
        @include('producto.agregar-form.fila1')

        @include('producto.agregar-form.fila2')
        @include('producto.agregar-form.fila3')
        @include('producto.agregar-form.fila4')

        
    
    <div class="container  ">

        <button type="submit" id="producto_agregar_btn_id" name="producto_agregar_btn_id" class="btn btn-primary ">GUARDAR</button>
    </div>
    </div>
    </form>

</div>
