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
        Schema::create('commendations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->date('date_of_commention');
            $table->string('city_municipality');
            $table->string('province');
            $table->string('region');
            $table->enum('type_of_eboss', ['Partly-Automated', 'Fully-Automated', 'Physical/Collocated BOSS', 'No Collocated BOSS']);
            $table->enum('certification_status', ['Certified', 'Not-Certified']);
            $table->date('date_of_full_compliance');
            $table->text('remarks_justification')->nullable();
            $table->string('signatory_approving_officer')->nullable();
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
        Schema::dropIfExists('commendations');
    }
};
