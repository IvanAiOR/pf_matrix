<div class="form-group col-md-2">
    <label for="producto_agregar_margen_precio">Margen Precio (%)</label>
    <div class="input-group mb-3">
        <input type="text" class="form-control text-right" maxlength="5" disabled id="producto_agregar_margen_precio" placeholder="0.00" aria-describedby="h-producto" placeholder="">
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon2">%</span>
        </div>
      </div>
    
    <div class="form-group">
        <label for="producto_agregar_tope_oferta">Tope Oferta</label>
        <input type="text" class="form-control text-right precio" id="producto_agregar_tope_oferta" disabled maxlength="15" placeholder="999999999.99" aria-describedby="h-producto" >
    </div>

    <label for="producto_agregar_margen_tope_oferta">Margen Tope Oferta (%)</label>
    <div class="input-group mb-3">
        <input type="text" class="form-control text-right" maxlength="5"  disabled id="producto_agregar_margen_tope_oferta" placeholder="0.00" aria-describedby="h-producto" placeholder="">
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon2">%</span>
        </div>
      </div>
    
    <div class="form-group">
        <label for="producto_agregar_oferta">Oferta Real</label>
        <input type="text" class="form-control text-right precio" id="producto_agregar_oferta" maxlength="15" pattern=".{2,}"   required title="Requiere al menos de 1 caracter"  placeholder="999999999.99" aria-describedby="h-producto" >
    </div>
    
    <label for="producto_agregar_margen_oferta">Margen Oferta Real (%)</label>
    <div class="input-group mb-3">
        <input type="text" class="form-control text-right" maxlength="5" disabled id="producto_agregar_margen_oferta" placeholder="0.00" aria-describedby="h-producto" placeholder="">
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon2">%</span>
        </div>
      </div>
    
    <div class="form-group">
        <label for="producto_agregar_fecha_inicio">Fecha Inicio</label>
        <datepicker-inicio-oferta></datepicker-inicio-oferta>
        {{-- <input type="text" class="form-control datepicker" id="producto_agregar_fecha_inicio" placeholder="DD-MM-AAAA" aria-describedby="h-producto" > --}}
    </div>
    <div class="form-group">
        <label for="producto_agregar_fecha_inicio">Fecha Fin</label>
        <datepicker-fin-oferta></datepicker-fin-oferta>
        {{-- <input type="text" class="form-control datepicker" id="producto_agregar_fecha_inicio" placeholder="DD-MM-AAAA" aria-describedby="h-producto" > --}}
    </div>
    
    
    
</div>