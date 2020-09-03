<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Trato_precio extends Model
{
    //
    protected $table = 'trato_precio';
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
