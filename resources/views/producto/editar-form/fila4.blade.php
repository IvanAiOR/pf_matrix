<div class="form-group col-md-2">
    <div class="form-group">
        <label for="producto_editar_margen_precio">Margen Precio (%)</label>
        <input type="text" class="form-control text-right" maxlength="5" disabled id="producto_editar_margen_precio" placeholder="0.00" aria-describedby="h-producto" placeholder="">
    </div>
    <div class="form-group">
        <label for="producto_editar_tope_oferta">Tope Oferta</label>
        <input type="text" class="form-control text-right precio" id="producto_editar_tope_oferta" disabled maxlength="15" placeholder="999999999.99" aria-describedby="h-producto" >
    </div>
    
    <div class="form-group">
        <label for="producto_editar_margen_tope_oferta">Margen Tope Oferta (%)</label>
        <input type="text" class="form-control text-right" maxlength="5"  disabled id="producto_editar_margen_tope_oferta" placeholder="0.00" aria-describedby="h-producto" placeholder="">
    </div>
    
    <div class="form-group">
        <label for="producto_editar_oferta">Oferta Real</label>
        <input type="text" class="form-control text-right precio" id="producto_editar_oferta" maxlength="15" placeholder="999999999.99" aria-describedby="h-producto" >
    </div>
    <div class="form-group">
        <label for="producto_editar_margen_oferta">Margen Oferta Real (%)</label>
        <input type="text" class="form-control text-right" maxlength="5" disabled id="producto_editar_margen_oferta" placeholder="0.00" aria-describedby="h-producto" placeholder="">
    </div>
    <div class="form-group">
        <label for="producto_editar_fecha_inicio">Fecha Inicio</label>
        <datepicker-inicio-oferta-editar></datepicker-inicio-oferta-editar>
        {{-- <input type="text" class="form-control datepicker" id="producto_editar_fecha_inicio" placeholder="DD-MM-AAAA" aria-describedby="h-producto" > --}}
    </div>
    <div class="form-group">
        <label for="producto_editar_fecha_inicio">Fecha Fin</label>
        <datepicker-fin-oferta-editar></datepicker-fin-oferta-editar>
        {{-- <input type="text" class="form-control datepicker" id="producto_editar_fecha_inicio" placeholder="DD-MM-AAAA" aria-describedby="h-producto" > --}}
    </div>
    
    
    
</div>