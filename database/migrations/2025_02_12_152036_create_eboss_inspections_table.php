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
        Schema::create('eboss_inspections', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->date('date_of_inspection');
            $table->string('city_municipality');
            $table->string('province');
            $table->string('region');
            $table->date('eboss_submission_date');
            $table->enum('type_of_eboss', ['Partly-Automated', 'Fully-Automated', 'Physical/Collocated BOSS', 'No Collocated BOSS']);
            $table->date('deadline_of_action_plan');
            $table->date('submission_of_action_plan');
            $table->text('remarks')->nullable();
            $table->string('bplo_head')->nullable();
            $table->string('contact_no')->nullable();
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
        Schema::dropIfExists('eboss_inspections');
    }
};
