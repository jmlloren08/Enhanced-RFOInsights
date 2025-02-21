<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orientations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->date('date_of_orientation');
            $table->string('lgu_office_name');
            $table->string('city_municipality');
            $table->string('province');
            $table->string('region');
            $table->string('type_of_participants');
            $table->integer('total_number_of_participants');
            $table->enum('training_mode', ['Face-to-Face', 'Virtual', 'Hybrid']);
            $table->text('key_topics_discussed');
            $table->string('resource_speakers');
            $table->text('feedback_assessment_of_training')->nullable();
            $table->string('attachments')->nullable();
            $table->string('attachment_type')->nullable();
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orientations');
    }
};
