<div class="form-group col">
    <input type="text" id="producto_editar_usuario" hidden value="{{Auth::user()->id}}">
    <div class="form-group">
        <label for="producto_editar_descripcion">ID Convenio Marco</label>
        <input type="text" required class="form-control text-right"  id="producto_editar_id_cm" aria-describedby="h-producto" placeholder="0000000000000">
    </div>
    <div class="form-group">
        <label for="producto_editar_descripcion">Descipcion del Producto</label>
        <textarea type="text" required class="form-control"  id="producto_editar_descripcion" aria-describedby="h-producto" placeholder="Ingresa una descripción"></textarea>
    </div>
    <div class="form-group">
        <label for="producto_editar_pn">Part Number (P/N)</label>
        <input type="text" required class="form-control"  id="producto_editar_pn" aria-describedby="h-producto" placeholder="Numero de Parte">
    </div>
    <div class="form-group">
        <label for="producto_editar_categoria">Categoria</label>
        <select required class="custom-select" id="producto_editar_categoria">
            <option selected></option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
    </div>
    <div class="form-group">
        <label for="producto_editar_marca">Marca</label>
        <select required class="custom-select"  id="producto_editar_marca">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
    </div>
    <div class="form-group">
        <label for="producto_editar_prioridad">Prioridad</label>
        <select required class="custom-select" id="producto_editar_prioridad">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
    </div>
    <div class="form-group">
        <label for="producto_editar_responsable">Responsable</label>
        <select required class="custom-select" id="producto_editar_responsable">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
    </div>
    
    

</div>