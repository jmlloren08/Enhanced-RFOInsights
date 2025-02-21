<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
        // Define Roles and Permissions
        Role::firstOrCreate(['name' => 'admin']);
        Role::firstOrCreate(['name' => 'sales_rep']);

        Permission::firstOrCreate(['name' => 'manage-customers']);
        Permission::firstOrCreate(['name' => 'manage-leads']);
        Permission::firstOrCreate(['name' => 'assign-tasks']);
    }
}
