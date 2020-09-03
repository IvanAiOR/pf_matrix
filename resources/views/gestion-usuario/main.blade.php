@extends('layouts.app')

@section('content')


<div class="">
    <div class="row mw-100">
        <div class="col-md-12">
            <div class="row justify-content-center">
                {{-- contenedor de la gestión de marcas --}}
                <div class="row col-md-6 justify-content-center" id="id-panel-usuario">
                    

                    <div class=" row col-md-6 justify-content-center">
                        <div class="col-md-12">
                        <br>
                        {{-- agregar marca --}}
                        @include('gestion-usuario.agregar')
                        
                        </div>
                        <div class="col-md-12">
                            <br>
                             {{-- editar marca --}}
                        
                              @include('gestion-usuario.editar')
                        </div>
                    </div>
    
                    <div class="col-md-6">
                        <br>
                        {{-- listar marca --}}
                         @include('gestion-usuario.listar')
                        
                    </div> 
                                                  
                </div>
            </div>            
        </div>
    </div>
</div>
@endSection