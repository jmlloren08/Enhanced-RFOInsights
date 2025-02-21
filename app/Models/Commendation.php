<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commendation extends Model
{
    use HasFactory, HasUuids;
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'date_of_commendation',
        'city_municipality',
        'province',
        'region',
        'type_of_eboss',
        'certification_status',
        'date_of_full_compliance',
        'remarks_justification',
        'signatory_approving_officer',
        'attachments',
        'attachment_type',
    ];
    public function cities()
    {
        return $this->belongsTo(Cities::class, 'city_municipality', 'id');
    }
    public function provinces()
    {
        return $this->belongsTo(Province::class, 'province', 'id');
    }
    public function regions()
    {
        return $this->belongsTo(Region::class, 'region', 'id');
    }
}
