@extends('layouts.app')

@section('content')

<div class="">
    <div class="row mw-100">
        <div class="col-md-12">
            <div class="row justify-content-center">
                {{-- contenedor de la gestión de marcas --}}
                <div class="row col-md-6 justify-content-center">
                    

                    <div class=" row col-md-6 justify-content-center">
                        <div class="col-md-12">
                        <br>
                        {{-- agregar marca --}}
                        @include('menu.marca.agregar')
                        
                        </div>
                        <div class="col-md-12">
                            <br>
                             {{-- editar marca --}}
                        
                             @include('menu.marca.editar')
                        </div>
                    </div>
    
                    <div class="col-md-6">
                        <br>
                        {{-- listar marca --}}
                        @include('menu.marca.listar')
                        
                    </div> 
                                                  
                </div>
            </div>            
        </div>
    </div>
</div>
@endsection