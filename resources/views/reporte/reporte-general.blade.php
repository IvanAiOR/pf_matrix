<div class="card shadow ">
    <div class="card-header bg-success"><span class="text-white d-flex justify-content-center">REPORTE GENERAL</span></div>
    <div class="card-body">
        <div class="mt-4">
            
            @include('reporte.general.reporte-estado-producto')
        </div>
        <div class="mt-4">
            
            @include('reporte.general.reporte-adheridos-mes')
        </div>
        <div class="mt-4">
            
            @include('reporte.general.reporte-adheridos-anio')
        </div>
        <div class="mt-4">

            @include('reporte.general.reporte-producto-categoria')
        </div>
        <div class="mt-4">

            @include('reporte.general.reporte-producto-ofertados')
        </div>
    </div>
</div>