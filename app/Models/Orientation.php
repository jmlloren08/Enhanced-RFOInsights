<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orientation extends Model
{
    use HasFactory, HasUuids;
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'date_of_orientation',
        'lgu_office_name',
        'city_municipality',
        'province',
        'region',
        'type_of_participants',
        'total_number_of_participants',
        'training_mode',
        'key_topics_discussed',
        'resource_speakers',
        'feedback_assessment_of_training',
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
