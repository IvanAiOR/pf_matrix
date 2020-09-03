@extends('layouts.app')

@section('content')

<div class="">
    <div class="row mw-100">
        <div class="col-md-12">
            <div class="row justify-content-center">
                
                {{-- contenedor de la gestión de estatus cm --}}
                <div class="row col-md-6 justify-content-center">
                    

                    <div class=" row col-md-6 justify-content-center">
                        <div class="col-md-12">
                        <br>
                        {{-- agregar estatus cm --}}
                        @include('menu.estatus_cm.agregar')
                        
                        </div>
                        <div class="col-md-12">
                            <br>
                             {{-- editar estatus cm --}}
                        
                             @include('menu.estatus_cm.editar')
                        </div>
                    </div>
    
                    <div class="col-md-6">
                        <br>
                        {{-- listar estatus cm --}}
                        @include('menu.estatus_cm.listar')
                        
                    </div> 
                                                  
                </div>
                
            </div>            
        </div>
    </div>
</div>
@endsection