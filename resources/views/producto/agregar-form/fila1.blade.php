<div class="form-group col">
    <input type="text" id="producto_agregar_usuario" hidden value="{{Auth::user()->id}}">
    <div class="form-group">
        <label for="producto_agregar_descripcion">ID Convenio Marco</label>
        <input type="text" required class="form-control text-right"  id="producto_agregar_id_cm" aria-describedby="h-producto" placeholder="0000000000000">
    </div>
    <div class="form-group">
        <label for="producto_agregar_descripcion">Descipcion del Producto</label>
        <textarea type="text" required class="form-control"  id="producto_agregar_descripcion" aria-describedby="h-producto" placeholder="Ingresa una descripción"></textarea>
    </div>
    <div class="form-group">
        <label for="producto_agregar_pn">Part Number (P/N)</label>
        <input type="text" required class="form-control"  id="producto_agregar_pn" aria-describedby="h-producto" placeholder="Numero de Parte">
    </div>
    <div class="form-group">
        <label for="producto_agregar_categoria">Categoria</label>
        <select required class="custom-select" id="producto_agregar_categoria">
            <option selected></option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
    </div>
    <div class="form-group">
        <label for="producto_agregar_marca">Marca</label>
        <select required class="custom-select"  id="producto_agregar_marca">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
    </div>
    <div class="form-group">
        <label for="producto_agregar_prioridad">Prioridad</label>
        <select required class="custom-select" id="producto_agregar_prioridad">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
    </div>
    <div class="form-group">
        <label for="producto_agregar_responsable">Responsable</label>
        <select required class="custom-select" id="producto_agregar_responsable">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
    </div>
    
    

</div>