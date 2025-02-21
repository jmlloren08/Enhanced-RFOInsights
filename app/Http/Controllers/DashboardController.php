<?php

namespace App\Http\Controllers;

use App\Models\Commendation;
use App\Models\EbossInspection;
use App\Models\Inspection;
use App\Models\Orientation;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        try {
            return Inertia::render('Dashboard', [
                'totalEboss' => EbossInspection::count(),
                'totalCommendation' => Commendation::count(),
                'totalInspection' => Inspection::count(),
                'totalOrientation' => Orientation::count(),
                'typeOfBoss' => EbossInspection::selectRaw('type_of_eboss, COUNT(*) as count')
                    ->groupBy('type_of_eboss')
                    ->get(),
                'commendations' => Commendation::selectRaw('MONTHNAME(date_of_commendation) as month, MONTH(date_of_commendation) as month_number, COUNT(*) as count')
                    ->groupByRaw('MONTHNAME(date_of_commendation), MONTH(date_of_commendation)')
                    ->orderByRaw('MONTH(date_of_commendation)')
                    ->get()
                    ->map(function ($comm) {
                        return [
                            'month' => $comm->month,
                            'count' => $comm->count,
                        ];
                    })->values(),
                'inspections' => Inspection::with('regions')
                    ->select('region', 'compliance_rating')
                    ->get(),
                'orientations' => Orientation::select('type_of_participants', 'total_number_of_participants')
                    ->get(),
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching dashboard data (eBOSS, Commendation, Inspection, Orientation)', ['message' => $e->getMessage()]);
            return Inertia::render('Error/Index', ['message' => $e->getMessage()]);
        }
    }
}
