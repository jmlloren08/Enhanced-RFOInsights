<?php

namespace App\Http\Controllers;

use App\Models\Commendation;
use App\Models\EbossInspection;
use App\Models\Inspection;
use App\Models\Orientation;
use App\Models\Region;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        try {
            $regionId = $request->query('region_id');
            $query = fn($model) => $regionId ? $model->where('region', $regionId) : $model;
            return Inertia::render('Dashboard', [
                'totalEboss' => $query(EbossInspection::query())->count(),
                'totalCommendation' => $query(Commendation::query())->count(),
                'totalInspection' => $query(Inspection::query())->count(),
                'totalOrientation' => $query(Orientation::query())->count(),
                'typeOfBoss' => $query(EbossInspection::query())
                    ->selectRaw('type_of_eboss, COUNT(*) as count')
                    ->groupBy('type_of_eboss')
                    ->get(),
                'commendations' => $query(Commendation::query())
                    ->selectRaw('MONTHNAME(date_of_commendation) as month, MONTH(date_of_commendation) as month_number, COUNT(*) as count')
                    ->groupByRaw('MONTHNAME(date_of_commendation), MONTH(date_of_commendation)')
                    ->orderByRaw('MONTH(date_of_commendation)')
                    ->get()
                    ->map(fn($comm) => ['month' => $comm->month, 'count' => $comm->count])
                    ->values(),
                'inspections' => $query(Inspection::with('regions'))
                    ->select('region', 'compliance_rating')
                    ->get(),
                'orientations' => $query(Orientation::select('type_of_participants', 'total_number_of_participants'))
                    ->get(),
                'regions' => Region::select('id', 'name')->orderBy('number', 'asc')->get(),
                'selectedRegion' => $regionId
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching dashboard data (eBOSS, Commendation, Inspection, Orientation)', ['message' => $e->getMessage()]);
            return Inertia::render('Error/Index', ['message' => $e->getMessage()]);
        }
    }
}
