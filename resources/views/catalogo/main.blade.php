@extends('layouts.app')

@section('content')
<br><br>
<div class="w-100 justify-content-center">

    <div class="ml-2 mt-5" id="panel_catalogo_id">
        <div class="card shadow">
                <br>
            <h1 class="card-title text-center">CATALOGO SUMATEC</h1>
            <div class="card-body">
                <button class="btn btn-success" id="catalogo_btn_id">DESCARGAR CATALOGO 👇</button>
                <br>
                <br>
                <div class="table-responsive-md">
                    <table class="table table-striped lista">
                        <thead>
                            <tr>
                                <th class="text-center">
                                    CATEGORÍA
                                </th>
                                <th class="text-center">
                                    MARCA
                                </th>
                                <th class="text-center">
                                    DESCRIPCIÓN DEL PRODUCTO
                                </th>
                                <th class="text-center">
                                    PART NUMBER
                                </th>
                                <th class="text-center">
                                    ID CONVENIO
                                </th>
                            </tr>
                        </thead>
                        <tbody id="catalogo_tabla_body_id">
        
                        </tbody>
                    </table>
                </div>
                <br>
            </div>
        </div>
    </div>
</div>