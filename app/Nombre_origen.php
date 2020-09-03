<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Nombre_origen extends Model
{
    
    protected $table = 'nombre_origen';
    protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name','id',
    ];
}
