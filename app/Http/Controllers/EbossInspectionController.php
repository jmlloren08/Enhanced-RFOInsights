<?php

namespace App\Http\Controllers;

use App\Models\Cities;
use App\Models\EbossInspection;
use App\Models\Province;
use App\Models\Region;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EbossInspectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $eboss = EbossInspection::with('regions', 'provinces', 'cities')
                ->latest()
                ->paginate(5);

            $counts = [
                'fully_automated' => EbossInspection::where('type_of_eboss', 'Fully-Automated')->count(),
                'partly_automated' => EbossInspection::where('type_of_eboss', 'Partly-Automated')->count(),
                'physical_collocated' => EbossInspection::where('type_of_eboss', 'Physical/Collocated BOSS')->count(),
                'no_collocated' => EbossInspection::where('type_of_eboss', 'No Collocated BOSS')->count(),
            ];

            return Inertia::render('Eboss/Index', [
                'eboss' => $eboss,
                'counts' => $counts
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching eboss', ['message: e' => $e->getMessage()]);
            // return Inertia::render('Error', ['message' => $e->getMessage()]);
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        try {
            $regions = Region::select('id', 'name')->orderBy('number', 'asc')->get();
            return Inertia::render('Eboss/Create', ['regions' => $regions]);
        } catch (\Exception $e) {
            Log::error('Error creating eboss', ['message' => $e->getMessage()]);
            // return Inertia::render('Error', ['message' => $e->getMessage()]);
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {

            $validatedData = $request->validate([
                'date_of_inspection' => 'required|date',
                'city_municipality' => 'required|string|max:255',
                'province' => 'required|string|max:255',
                'region' => 'required|string|max:255',
                'eboss_submission_date' => 'required|date',
                'type_of_eboss' => 'required|in:Partly-Automated,Fully-Automated,Physical/Collocated BOSS,No Collocated BOSS',
                'deadline_of_action_plan' => 'required|date',
                'submission_of_action_plan' => 'required|date',
                'remarks' => 'nullable|string|max:1000',
                'bplo_head' => 'nullable|string|max:255',
                'contact_no' => 'nullable|string|max:255',
                'attachments' => 'nullable|file|mimes:jpg,jpeg,png,pdf,ppt,pptx,xls,xlsx,doc,docx|max:2048',
                'attachment_type' => 'nullable|string|max:2000',
            ]);

            $attachmentPath = 'No attachment';
            $attachmentType = 'N/A';

            if ($request->hasFile('attachments')) {
                $attachmentPath = $request->file('attachments')->store('attachments', 'public');
                $attachmentType = 'File';
            } elseif ($request->input('attachment_type')) {
                $attachmentPath = $request->input('attachment_type');
                $attachmentType = 'Link';
            }

            EbossInspection::create([
                'date_of_inspection' => $validatedData['date_of_inspection'],
                'city_municipality' => $validatedData['city_municipality'],
                'province' => $validatedData['province'],
                'region' => $validatedData['region'],
                'eboss_submission_date' => $validatedData['eboss_submission_date'],
                'type_of_eboss' => $validatedData['type_of_eboss'],
                'deadline_of_action_plan' => $validatedData['deadline_of_action_plan'],
                'submission_of_action_plan' => $validatedData['submission_of_action_plan'],
                'remarks' => $validatedData['remarks'] ?? 'No remarks encoded',
                'bplo_head' => $validatedData['bplo_head'] ?? 'No BPLO Head encoded',
                'contact_no' => $validatedData['contact_no'] ?? 'No contact number encoded',
                'attachments' => $attachmentPath,
                'attachment_type' => $attachmentType,
            ]);

            return redirect()->route('eboss.index')->with('success', 'eBOSS Inspection created successfully');
        } catch (\Exception $e) {
            if ($request->hasFile('attachments')) {
                Storage::delete($request->file('attachments')->store('attachments', 'public'));
            }
            Log::error('Error creating eBOSS', ['message' => $e->getMessage()]);
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $eboss = EbossInspection::with('regions', 'provinces', 'cities')->findOrFail($id);
            return Inertia::render('Eboss/Show', [
                'eboss' => $eboss
            ]);
        } catch (\Exception $e) {
            Log::error('Error showing eboss', ['message' => $e->getMessage()]);
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(EbossInspection $ebossInspection)
    {
        //
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, EbossInspection $ebossInspection)
    {
        //
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EbossInspection $ebossInspection)
    {
        //
    }
}
