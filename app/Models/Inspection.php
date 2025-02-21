<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inspection extends Model
{
    use HasFactory, HasUuids;
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'date_of_inspection',
        'lgu_office_name',
        'city_municipality',
        'province',
        'region',
        'department_office_inspected',
        'compliance_rating',
        'findings_observations',
        'deficiences_noted',
        'recommendations_for_improvement',
        'deadline_for_compliance',
        'follow_up_inspection_date',
        'inspecting_officer',
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
