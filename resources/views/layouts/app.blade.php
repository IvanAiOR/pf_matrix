<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <link rel="shortcut icon" href="{{ asset('img/Sumatec-icon.png') }}" type="image/x-icon">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'MATRIX') }}</title>

    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
        
    <div id="app">
        <div class="loader-wrapper" >
            <span class="loader"><span class="loader-inner"></span></span>
        </div>
        
        <nav class="navbar  navbar-expand-md navbar-light fixed-top fondo-azul navbar-dark  shadow  ">
            <div class="">

                <img class="ml-5" src="{{ asset('img/Sumatec-blanco.png') }}"  style="height: 4em">
            </div>
            <div class="container">
                {{-- <a class="navbar-brand" href="{{ url('/home') }}">
                   <span class="text-white"> {{ config('app.name', 'Matrix') }} </span>
                </a> --}}
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">
                        @guest

                        @else   
                        <li class="nav-item dropdown">
                            <a id="navbarDropdown" class="nav-link dropdown-toggle text-white" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                            <span class="text-white"> REPORTES </span> 
                            </a>

                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="{{ route('home') }}">
                                    <SPAN>GENERAL</SPAN>
                                </a>
                                {{-- <a class="dropdown-item" href="{{ route('home') }}">
                                    <SPAN>HARDWARE</SPAN>
                                </a>
                                <a class="dropdown-item" href="{{ route('home') }}">
                                    <SPAN>SOFTWARE</SPAN>
                                </a>           --}}
                                <a class="dropdown-item" href="{{ route('catalogo') }}">
                                    <SPAN>GENERAR CATÁLOGO</SPAN>
                                </a>                         

                            </div>

                        </li>
                        <a href="{{ url('/home') }}" class="nav-link text-white">
                        
                        <a class="nav-link text-white" href="{{ route('producto') }}">
                            <span>
                                PRODUCTOS
                            </span> 
                        </a>
                        @isset($rol)
                            @if ($rol->gestion_parametros==1)
                                
                                <li class="nav-item dropdown">
                                    <a id="navbarDropdown" class="nav-link dropdown-toggle text-white" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    <span class="text-white"> PARAMETROS </span> 
                                    </a>

                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                        <a class="dropdown-item" href="{{ route('categoria') }}">
                                            <SPAN>CATEGORÍA</SPAN>
                                        </a>
                                        <a class="dropdown-item" href="{{ route('comentario') }}">
                                            <SPAN>COMENTARIO</SPAN>
                                        </a>
                                        <a class="dropdown-item" href="{{ route('estatus_cm') }}">
                                            <SPAN>ESTATUS CM</SPAN>
                                        </a>
                                        <a class="dropdown-item" href="{{ route('marca') }}">
                                            <SPAN>MARCA</SPAN>
                                        </a>
                                        <a class="dropdown-item" href="{{ route('origen') }}">
                                            <SPAN>ORIGEN</SPAN>
                                        </a>
                                        <a class="dropdown-item" href="{{ route('nombre_origen') }}">
                                            <SPAN>NOMBRE ORIGEN</SPAN>
                                        </a>
                                        <a class="dropdown-item" href="{{ route('prioridad') }}">
                                            <SPAN>PRIORIDAD</SPAN>
                                        </a>
                                        <a class="dropdown-item" href="{{ route('trato_precio') }}">
                                            <SPAN>TRATO PRECIO</SPAN>
                                        </a>
                                        

                                    </div>

                                </li>
                            @endif
                            
                            {{-- {{die($rol)}} --}}

                                @if ($rol->gestion_usuario==1)

                                <li class="nav-item dropdown">
                                
                                    <a id="navbarDropdown_admin" class="nav-link dropdown-toggle text-white" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                        <span class="text-white"> ADMINISTRADOR </span> 
                                    </a>
        
                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown_admin">
                                        <a class="dropdown-item" href="{{ route('usuario') }}">
                                            <span>
                                                GESTIÓN USUARIO
                                            </span> 
                                        </a>
                                        <a class="dropdown-item" href="{{ route('rol') }}">
                                            <span>
                                                GESTIÓN ROLES
                                            </span> 
                                        </a>
                                        <a class="dropdown-item" href="{{ route('producto-deleted') }}">
                                            <span>
                                                PRODUCTOS ELIMINADOS
                                            </span> 
                                        </a>
                                        <a class="dropdown-item" href="{{ route('importar') }}">
                                            <span>
                                                    IMPORTAR STATUS C.M. 
                                            </span> 
                                        </a>
                                    </div>
                                </li>
                                
                                @endif

                        @endisset
                        
                        
                        @endguest
                        <li>
                            <a class="nav-link text-white" href="https://shorturl.at/bjzPR" target="_blank" title="Ir a Banco Central">
                                <span id="Dolar_Observado"></span>
                            </a>
                            
                        </li>
                    </ul>


                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Authentication Links -->
                        @guest
                            <li class="nav-item">
                                <a class="nav-link text-white" href="{{ route('login') }}">{{ __('Iniciar Sesión') }}</a>
                            </li>
                            {{-- @if (Route::has('register'))
                                <li class="nav-item">
                                    <a class="nav-link text-white" href="{{ route('register') }}">{{ __('Registrarse (Temporal)') }}</a>
                                </li>
                            @endif --}}
                        @else
                            <li class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle text-white" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    {{ Auth::user()->name }} <span class="caret"></span>
                                </a>

                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Salir') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                        @csrf
                                    </form>
                                </div>
                            </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>
<br>
<br>
        <main class="py-4">
            @yield('content')
        </main>
        <footer class=" d-flex justify-content-center">
            <span class="text-muted">© Copyright <span id="copyright_anio"></span>. All Rights Reserved. Sumatec. Tena. </span>
          </footer>

        @include('modal-confirmar')       
        
          
</body>
</html>
