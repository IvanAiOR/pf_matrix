@extends('layouts.app')

@section('content')

<div class="">
    <div class="row mw-100">
        <div class="col-md-12">
            <div class="row justify-content-center">
                
                {{-- contenedor de la gestión de categorias --}}
                <div class="row col-md-6 justify-content-center">
                    

                    <div class=" row col-md-6 justify-content-center">
                        <div class="col-md-12">
                        <br>
                        {{-- agregar categoria --}}
                        @include('menu.categoria.agregar')
                        
                        </div>
                        <div class="col-md-12">
                            <br>
                             {{-- editar categoria --}}
                        
                             @include('menu.categoria.editar')
                        </div>
                    </div>
    
                    <div class="col-md-6">
                        <br>
                        {{-- listar categoria --}}
                        @include('menu.categoria.listar')
                        
                    </div> 
                                                  
                </div>
               
                
            </div>            
        </div>
    </div>
</div>
@endsection