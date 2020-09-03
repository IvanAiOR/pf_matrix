@extends('layouts.app')

@section('content')

<div class="">
    <div class="row mw-100">
        <div class="col-md-12">
            <div class="row justify-content-center">
                
                {{-- contenedor de la gestión de nombre origen --}}
                <div class="row col-md-6 justify-content-center">
                    

                    <div class=" row col-md-6 justify-content-center">
                        <div class="col-md-12">
                        <br>
                        {{-- agregar nombre origen --}}
                        @include('menu.trato_precio.agregar')
                        
                        </div>
                        <div class="col-md-12">
                            <br>
                             {{-- editar nombre origen --}}
                        
                             @include('menu.trato_precio.editar')
                        </div>
                    </div>
    
                    <div class="col-md-6">
                        <br>
                        {{-- listar nombre origen --}}
                        @include('menu.trato_precio.listar')
                        
                    </div> 
                                                  
                </div>
                
            </div>            
        </div>
    </div>
</div>
@endsection