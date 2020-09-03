<div class="row">
    <div class="form-group col-lg-2">
        <label for="producto_filtro_marca">Marca</label>
        <select class="custom-select" id="producto_filtro_marca">
            <option selected>Marca</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          
        </div>
              <div class="form-group col-lg-2">
                <label for="producto_filtro_categoria">Categoría</label>
                <select class="custom-select" id="producto_filtro_categoria">
                    <option selected>Categoría</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
            </div>
              <div class="form-group col-lg-2">
                <label for="producto_filtro_prioridad">Prioridad</label>
                <select class="custom-select" id="producto_filtro_prioridad">
                    <option selected>Prioridad</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
            </div>
              <div class="form-group col-lg-2">
                <label for="producto_filtro_responsable">Responsable</label>
                <select class="custom-select" id="producto_filtro_responsable">
                    <option selected>Responsable</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
            </div>
              <div class="form-group col-lg-2">
                <label for="producto_filtro_origen">Origen</label>
                <select class="custom-select" id="producto_filtro_origen">
                    <option selected>Origen</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
            </div>
              <div class="form-group col-lg-2">
                <label for="producto_filtro_nombre_origen">Nombre Origen</label>
                <select class="custom-select" id="producto_filtro_nombre_origen">
                    <option selected>Nombre Origen</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
            </div>
            <div class="form-group col-lg-2">
                <label for="producto_filtro_trato_precio">Trato Precio</label>
                <select class="custom-select" id="producto_filtro_trato_precio">
                    <option selected>Trato Precio</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
            </div>
            <div class="form-group col-lg-2">
                <label for="producto_filtro_estatus_cm">Estatus CM.</label>
                <select class="custom-select" id="producto_filtro_estatus_cm">
                    <option selected>Estatus CM.</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
            </div>
            <div class="form-group col-lg-2">
                <label for="producto_filtro_comentario_habilitado">Comentario Habilitado</label>
                <select class="custom-select" id="producto_filtro_comentario_habilitado">
                    <option selected>Comentario Habilitado</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
            </div>
            <div class="form-group col-lg-2">
                <label for="producto_filtro_precio_min">Precio Minimo</label>
                <input id="producto_filtro_precio_min" type="text" class="form-control text-right precio" title="Requiere al menos de 1 caracter" placeholder="0.00" aria-describedby="h-producto" >
            </div>
            <div class="form-group col-lg-2">
                <label for="producto_filtro_precio_max">Precio Maximo</label>
                <input id="producto_filtro_precio_max" type="text" class="form-control text-right precio" title="Requiere al menos de 1 caracter" placeholder="0.00" aria-describedby="h-producto" >
            </div>
            <div class="col-lg-2">

              <div class="custom-control col-lg-12 custom-radio custom-control-inline">
                <input type="radio" class="custom-control-input" id="customRadio" name="ofertas" value="1">
                <label class="custom-control-label" for="customRadio">Ofertas Activas</label>
              </div>
              <div class="custom-control col-lg-12 custom-radio custom-control-inline">
                <input type="radio" class="custom-control-input" id="customRadio2" name="ofertas" value="2">
                <label class="custom-control-label" for="customRadio2">Nunca Ofertado</label>
              </div>
              <div class="custom-control col-lg-12 custom-radio custom-control-inline">
                <input type="radio" class="custom-control-input" id="customRadio3" name="ofertas" value="3">
                <label class="custom-control-label" for="customRadio3">Oferta Terminada</label>
              </div>
            </div>
            <div class="form-group col-lg-2">
              <label for="id_filtro_fecha_inicio">Fecha Inicio de oferta</label>
              <datepicker-personalizado id="id_filtro_fecha_inicio" vacio="true"></datepicker-personalizado>
            </div>
            
            <div class="form-group col-lg-2">
              <label for="id_filtro_fecha_final">Fecha final de oferta</label>
              <datepicker-personalizado id="id_filtro_fecha_final" vacio="true" ></datepicker-personalizado>
            </div>

              <div class="col-lg-2"></div>

            <div class="form-group col-lg-2">
              <label for="producto_filtro_margen_oferta_minimo">Margen oferta menor a:</label>
              <div class="input-group">
                <input id="producto_filtro_margen_oferta_minimo" type="text" class="form-control text-right precio" placeholder="0.00" aria-describedby="h-producto" >
                <div class="input-group-append">
                  <span class="input-group-text" id="basic-addon2">%</span>
                </div>
              </div>
              
            </div>

            <div class="form-group col-lg-2">
              <label class="card-title"><span class="muted">Fecha Busqueda Desde</span></label>
              <datepicker-personalizado id="id_filtro_fecha_rango_busqueda_desde" vacio="true" ></datepicker-personalizado>
            </div>
            <div class="form-group col-lg-2">
            <label class="card-title"><span class="muted">Fecha Busqueda Hasta</span></label>
            
            <datepicker-personalizado id="id_filtro_fecha_rango_busqueda_hasta" vacio="true" ></datepicker-personalizado>
            </div>
            
            

</div>