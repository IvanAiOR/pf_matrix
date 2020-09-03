@extends('layouts.app')

@section('content')

<div class="">
    <div class="row mw-100">
        <div class="col-md-12">
            <div class="row justify-content-center">
                
                {{-- contenedor de la gestión de origen --}}
                <div class="row col-md-8 justify-content-center">
                    

                    <div class=" row col-md-6 justify-content-center">
                        <div class="col-md-12">
                        <br>
                        {{-- agregar origen --}}
                        @include('gestion-rol.agregar')
                        
                        </div>
                        <div class="col-md-12">
                            <br>
                             {{-- editar origen --}}
                        
                             @include('gestion-rol.editar')
                        </div>
                    </div>
    
                    <div class="col-md-6">
                        <br>
                        {{-- listar origen --}}
                        @include('gestion-rol.listar')
                        
                    </div> 
                                                  
                </div>
            </div>            
        </div>
    </div>
</div>
@endsection