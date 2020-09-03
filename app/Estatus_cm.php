<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Estatus_cm extends Model
{
    //
    protected $table = 'estatus_cm';
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
