@extends('layouts.app')

@section('content')

<div class="">
    <div class="row mw-100">
        <div class="col-md-12">
            <div class="row justify-content-center">
                {{-- contenedor de la gestión de prioridades --}}
                <div class="row col-md-6 justify-content-center">
                    

                    <div class=" row col-md-6 justify-content-center">
                        <div class="col-md-12">
                        <br>
                        {{-- agregar prioridad --}}
                        @include('menu.prioridad.agregar')
                        
                        </div>
                        <div class="col-md-12">
                            <br>
                             {{-- editar prioridad --}}
                        
                             @include('menu.prioridad.editar')
                        </div>
                    </div>
    
                    <div class="col-md-6">
                        <br>
                        {{-- listar prioridad --}}
                        @include('menu.prioridad.listar')
                        
                    </div> 
                                                  
                </div>
            </div>            
        </div>
    </div>
</div>
@endsection