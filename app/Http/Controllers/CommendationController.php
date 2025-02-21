<?php

namespace App\Http\Controllers;

use App\Models\Commendation;
use App\Models\Region;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CommendationController extends Controller
{
    public function index()
    {
        try {
            $commendation = Commendation::with('regions', 'provinces', 'cities')
                ->latest()
                ->paginate(5);
            return Inertia::render('Commendation/Index', [
                'commendation' => $commendation,
                'commendationLineChart' => Commendation::selectRaw('MONTHNAME(date_of_commendation) as month, MONTH(date_of_commendation) as month_number, COUNT(*) as count')
                    ->groupByRaw('MONTHNAME(date_of_commendation), MONTH(date_of_commendation)')
                    ->orderByRaw('MONTH(date_of_commendation)')
                    ->get()
                    ->map(function ($comm) {
                        return [
                            'month' => $comm->month,
                            'count' => $comm->count,
                        ];
                    })->values(),
                // 'counts' => $counts
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching commendation', ['message' => $e->getMessage()]);
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
    public function create()
    {
        try {
            $regions = Region::select('id', 'name')->orderBy('number', 'asc')->get();
            return Inertia::render('Commendation/Create', ['regions' => $regions]);
        } catch (\Exception $e) {
            Log::error('Error creating commendation', ['message' => $e->getMessage()]);
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'date_of_commendation' => 'required|date',
                'city_municipality' => 'required|string|max:255',
                'province' => 'required|string|max:255',
                'region' => 'required|string|max:255',
                'type_of_eboss' => 'required|in:Partly-Automated,Fully-Automated,Physical/Collocated BOSS,No Collocated BOSS',
                'certification_status' => 'required|in:Certified,Not-Certified',
                'date_of_full_compliance' => 'required|date',
                'remarks_justification' => 'nullable|string|max:1000',
                'signatory_approving_officer' => 'nullable|string|max:255',
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

            Commendation::create([
                'date_of_commendation' => $validatedData['date_of_commendation'],
                'city_municipality' => $validatedData['city_municipality'],
                'province' => $validatedData['province'],
                'region' => $validatedData['region'],
                'type_of_eboss' => $validatedData['type_of_eboss'],
                'certification_status' => $validatedData['certification_status'],
                'date_of_full_compliance' => $validatedData['date_of_full_compliance'],
                'remarks_justification' => $validatedData['remarks_justification'] ?? 'No remarks/justification encoded',
                'signatory_approving_officer' => $validatedData['signatory_approving_officer'] ?? 'No signatory/approving officer encoded',
                'attachments' => $attachmentPath,
                'attachment_type' => $attachmentType,
            ]);

            return redirect()->route('commendation.index')->with('success', 'Commendation created successfully.');
        } catch (\Exception $e) {
            if ($request->hasFile('attachments')) {
                Storage::delete($request->file('attachments')->store('attachments', 'public'));
            }
            Log::error('Error storing commendation', ['message' => $e->getMessage()]);
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
    public function show($id)
    {
        try {
            $commendation = Commendation::with('regions', 'provinces', 'cities')->findOrFail($id);
            return Inertia::render('Commendation/Show', [
                'commendation' => $commendation
            ]);
        } catch (\Exception $e) {
            Log::error('Error showing commendation', ['message' => $e->getMessage()]);
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
