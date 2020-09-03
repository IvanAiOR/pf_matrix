@extends('layouts.app')

@section('content')
<div class="container">

    <div class="card shadow mt-3">
        <div class="card-header bg-success">
            <h4 class="card-title text-center text-white">Importar desde excel el listado de estatus en Convenio Marco</h4>
        </div>
        <div class="card-body">
            <form action="" id="importar_form" method="post" enctype="multipart/form-data">

                <div class="container">
                    <div class="custom-file">
                    <input type="file" class="custom-file-input" accept=".xls,.xlsx" name="archivo_importar" id="id_archivo_importar" lang="es">
                    <label class="custom-file-label" id="label_import" for="id_archivo_importar">Seleccionar Libro de Excel (.xlsx)</label>
                  </div>
                  
                  <div>
                      <br>
                      <button type="submit" class="btn btn-dark btn-circle text-white">Enviar</i></button>
                  </div>
                </div>
            </form>
        </div>
    </div>
    <br><br>
    <div class="container text-center">
        <h1>Recuerda que antes de Importar el archivo debes guardarlo con formato de "Libro de Excel". Esto permitira evitar errores!! </h1>
    </div>
</div>
@endsection