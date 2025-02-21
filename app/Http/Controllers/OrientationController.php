<?php

namespace App\Http\Controllers;

use App\Models\Orientation;
use App\Models\Region;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class OrientationController extends Controller
{
    public function index()
    {
        try {
            $orientation = Orientation::with('regions', 'provinces', 'cities')
                ->latest()
                ->paginate(5);
            return Inertia::render('Orientation/Index', [
                'orientation' => $orientation,
                // 'counts' => $counts
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching orientation', ['message' => $e->getMessage()]);
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
    public function create()
    {
        try {
            $regions = Region::select('id', 'name')->orderBy('number', 'asc')->get();
            return Inertia::render('Orientation/Create', ['regions' => $regions]);
        } catch (\Exception $e) {
            Log::error('Error creating orientation', ['message' => $e->getMessage()]);
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
    public function store(Request $request)
    {
        try {

            $validatedData = $request->validate([
                'date_of_orientation' => 'required|date',
                'lgu_office_name' => 'required|string|max:255',
                'city_municipality' => 'required|string|max:255',
                'province' => 'required|string|max:255',
                'region' => 'required|string|max:255',
                'type_of_participants' => 'required|string|max:255',
                'total_number_of_participants' => 'required|integer',
                'training_mode' => 'required|in:Face-to-Face,Virtual,Hybrid',
                'key_topics_discussed' => 'required|string|max:1000',
                'resource_speakers' => 'required|string|max:255',
                'feedback_assessment_of_training' => 'nullable|string|max:1000',
                'attachments' => 'nullable|file|mimes:jpg,jpeg,png,pdf,ppt,pptx,xls,xlsx,doc,docx|max:2048',
                'attachment_type' => 'nullable|string|max:255',
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

            Orientation::create([
                'date_of_orientation' => $validatedData['date_of_orientation'],
                'lgu_office_name' => $validatedData['lgu_office_name'],
                'city_municipality' => $validatedData['city_municipality'],
                'province' => $validatedData['province'],
                'region' => $validatedData['region'],
                'type_of_participants' => $validatedData['type_of_participants'],
                'total_number_of_participants' => $validatedData['total_number_of_participants'],
                'training_mode' => $validatedData['training_mode'],
                'key_topics_discussed' => $validatedData['key_topics_discussed'],
                'resource_speakers' => $validatedData['resource_speakers'],
                'feedback_assessment_of_training' => $validatedData['feedback_assessment_of_training'] ?? 'No feedback/assessment encoded',
                'attachments' => $attachmentPath,
                'attachment_type' => $attachmentType,
            ]);

            return redirect()->route('orientation.index')->with('success', 'Orientation created successfully');
        } catch (\Exception $e) {
            Log::error('Error storing orientation', ['message' => $e->getMessage()]);
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
    public function show($id)
    {
        try {
            $orientation = Orientation::with('regions', 'provinces', 'cities')->findOrFail($id);
            return Inertia::render('Orientation/Show', [
                'orientation' => $orientation
            ]);
        } catch (\Exception $e) {
            Log::error('Error showing orientation', ['message' => $e->getMessage()]);
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}