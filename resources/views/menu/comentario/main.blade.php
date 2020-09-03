@extends('layouts.app')

@section('content')

<div class="">
    <div class="row mw-100">
        <div class="col-md-12">
            <div class="row justify-content-center">
                
                {{-- contenedor de la gestión de comentario --}}
                <div class="row col-md-6 justify-content-center">
                    

                    <div class=" row col-md-6 justify-content-center">
                        <div class="col-md-12">
                        <br>
                        {{-- agregar comentario --}}
                        @include('menu.comentario.agregar')
                        
                        </div>
                        <div class="col-md-12">
                            <br>
                             {{-- editar comentario --}}
                        
                             @include('menu.comentario.editar')
                        </div>
                    </div>
    
                    <div class="col-md-6">
                        <br>
                        {{-- listar comentario --}}
                        @include('menu.comentario.listar')
                        
                    </div> 
                                                  
                </div>
            </div>            
        </div>
    </div>
</div>
@endsection