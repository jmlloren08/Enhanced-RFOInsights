<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index()
    {
        try {
            return Inertia::render('Notifications', [
                'notifications' => Auth::user()->notifications
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching notifications', ['message' => $e->getMessage()]);
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
