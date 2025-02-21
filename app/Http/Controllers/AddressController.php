<?php

namespace App\Http\Controllers;

use App\Models\Cities;
use App\Models\Province;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AddressController extends Controller
{
    public function getProvincesByRegion(Request $request)
    {
        try {
            $region_id = $request->region_id;
            $provinces = Province::select('id', 'name')
                ->where('region_id', $region_id)
                ->orderBy('name', 'asc')
                ->get();
            return response()->json($provinces);
        } catch (\Exception $e) {

            Log::error("Error fetching data: " . $e->getMessage());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
    public function getCitiesByProvince(Request $request)
    {
        try {
            $province_id = $request->province_id;
            $cities = Cities::select('id', 'name')
                ->where('province_id', $province_id)
                ->orderBy('name', 'asc')
                ->get();
            return response()->json($cities);
        } catch (\Exception $e) {
            Log::error("Error fetching data: " . $e->getMessage());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
