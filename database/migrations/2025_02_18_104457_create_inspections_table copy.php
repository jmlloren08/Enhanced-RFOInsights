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
        Schema::create('inspections', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->date('date_of_inspection');
            $table->string('lgu_office_name');
            $table->string('city_municipality');
            $table->string('province');
            $table->string('region');
            $table->string('department_office_inspected');
            $table->decimal('compliance_rating', 5, 2);
            $table->date('deadline_for_compliance');
            $table->string('inspecting_officer');
            $table->text('findings_observations')->nullable();
            $table->text('deficiences_noted')->nullable();
            $table->text('recommendations_for_improvement')->nullable();
            $table->date('follow_up_inspection_date')->nullable();
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
        Schema::dropIfExists('inspections');
    }
};
