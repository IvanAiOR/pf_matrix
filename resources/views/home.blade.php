@extends('layouts.app')

@section('content')
<br>
<div id="id_panel_home" class=" w-100 justify-content p-1 row">
    {{-- Reporte  General--}}
    <div class="col-md col-lg-4 justify-content-left">
        
        
        
        @include('reporte.reporte-general')
        
        
        
        
    </div>
    <div class="col-lg-8">
        <div class="">
            
            {{-- //Reporte Resumen Oferta --}}
            @include('reporte.reporte-ofertas')
            <br>
            
            @include('reporte.reporte-porcentaje-general')
        </div>
    </div>
        

    
</div>
<br>

@endsection
