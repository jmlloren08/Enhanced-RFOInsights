<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EbossInspection extends Model
{
    use HasFactory, HasUuids;
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'date_of_inspection',
        'city_municipality',
        'province',
        'region',
        'eboss_submission_date',
        'type_of_eboss',
        'deadline_of_action_plan',
        'submission_of_action_plan',
        'remarks',
        'bplo_head',
        'contact_no',
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
