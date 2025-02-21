<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cities extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'id',
        'name',
        'region_id',
        'province_id',
        'is_municipality',
    ];

    public function region()
    {
        return $this->belongsTo(Region::class);
    }
    public function province()
    {
        return $this->belongsTo(Province::class);
    }
}