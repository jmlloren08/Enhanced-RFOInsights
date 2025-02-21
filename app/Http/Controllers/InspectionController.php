<?php

namespace App\Http\Controllers;

use App\Models\Inspection;
use App\Models\Region;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class InspectionController extends Controller
{
    public function index()
    {
        try {
            $inspection = Inspection::with('regions', 'provinces', 'cities')
                ->latest()
                ->paginate(5);
            return Inertia::render('Inspection/Index', [
                'inspection' => $inspection,
                'inspectionBarChart' => Inspection::with('regions')
                    ->select('region', 'compliance_rating')
                    ->get(),
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching inspection', ['message' => $e->getMessage()]);
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
    public function create()
    {
        try {
            $regions = Region::select('id', 'name')->orderBy('number', 'asc')->get();
            return Inertia::render('Inspection/Create', ['regions' => $regions]);
        } catch (\Exception $e) {
            Log::error('Error creating inspection', ['message' => $e->getMessage()]);
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
    public function store(Request $request)
    {
        try {

            $validatedData = $request->validate([
                'date_of_inspection' => 'required|date',
                'lgu_office_name' => 'required|string|max:255',
                'city_municipality' => 'required|string|max:255',
                'province' => 'required|string|max:255',
                'region' => 'required|string|max:255',
                'department_office_inspected' => 'required|string|max:255',
                'compliance_rating' => 'required|string|max:255',
                'deadline_for_compliance' => 'required|date',
                'inspecting_officer' => 'required|string|max:255',
                'findings_observations' => 'nullable|string|max:1000',
                'deficiences_noted' => 'nullable|string|max:1000',
                'recommendations_for_improvement' => 'nullable|string|max:1000',
                'follow_up_inspection_date' => 'nullable|date',
                'attachments' => 'nullable|file|mimes:jpg,jpeg,png,pdf,ppt,pptx,xls,xlsx,doc,docx|max:2048',
                'attachment_type' => 'nullable|string|max:2000',
            ]);

            $attachmentPath = 'No attachment';
            $attachmentType = 'N/A';

            if (request()->hasFile('attachments')) {
                $attachmentPath = request()->file('attachments')->store('attachments', 'public');
                $attachmentType = 'File';
            } else if (request()->input('attachment_type')) {
                $attachmentPath = request()->input('attachment_type');
                $attachmentType = 'Link';
            }

            Inspection::create([
                'date_of_inspection' => $validatedData['date_of_inspection'],
                'lgu_office_name' => $validatedData['lgu_office_name'],
                'city_municipality' => $validatedData['city_municipality'],
                'province' => $validatedData['province'],
                'region' => $validatedData['region'],
                'department_office_inspected' => $validatedData['department_office_inspected'],
                'compliance_rating' => $validatedData['compliance_rating'],
                'deadline_for_compliance' => $validatedData['deadline_for_compliance'],
                'inspecting_officer' => $validatedData['inspecting_officer'],
                'findings_observations' => $validatedData['findings_observations'] ?? 'No Findings/Observations encoded',
                'deficiences_noted' => $validatedData['deficiences_noted'] ?? 'No Deficiencies Noted encoded',
                'recommendations_for_improvement' => $validatedData['recommendations_for_improvement'] ?? 'No Recommendations for Improvement encoded',
                'follow_up_inspection_date' => $validatedData['follow_up_inspection_date'] ?? 'No Follow-up Inspection Date encoded',
                'attachments' => $attachmentPath,
                'attachment_type' => $attachmentType,
            ]);

            return redirect()->route('inspection.index')->with('success', 'Inspection created successfully');
        } catch (\Exception $e) {
            Log::error('Error creating inspection', ['message' => $e->getMessage()]);
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
    public function show($id)
    {
        try {
            $inspection = Inspection::with('regions', 'provinces', 'cities')->findOrFail($id);
            return Inertia::render('Inspection/Show', [
                'inspection' => $inspection
            ]);
        } catch (\Exception $e) {
            Log::error('Error showing inspection', ['message' => $e->getMessage()]);
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
