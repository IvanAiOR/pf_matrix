<?php

namespace App;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\Importable;

//class Producto_Importado implements WithMultipleSheets 
class Producto_Importado implements ToCollection
    {
        use Importable;    
        
    }
 

