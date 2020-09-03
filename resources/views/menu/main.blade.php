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
                {{-- contenedor de la gestión de origen --}}
                <div class="row col-md-6 justify-content-center">
                    

                    <div class=" row col-md-6 justify-content-center">
                        <div class="col-md-12">
                        <br>
                        {{-- agregar origen --}}
                        @include('menu.origen.agregar')
                        
                        </div>
                        <div class="col-md-12">
                            <br>
                             {{-- editar origen --}}
                        
                             @include('menu.origen.editar')
                        </div>
                    </div>
    
                    <div class="col-md-6">
                        <br>
                        {{-- listar origen --}}
                        @include('menu.origen.listar')
                        
                    </div> 
                                                  
                </div>
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