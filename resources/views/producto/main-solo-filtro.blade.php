@extends('layouts.app')
@section('content')

<div class="">
    <div class="row mw-100">
        <div class="col-md-12">
            <div class="row justify-content-center">
                {{-- contenedor de la gestión de productos --}}
                
                    

                    <div class="col-md-11">
                        <br><br>
                        <br>
                        {{-- listar productos --}}
                        @include('producto.listar')
                        
                    </div> 
            </div>            
        </div>
    </div>
</div>
@endsection