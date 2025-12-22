<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\User;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            ['name' => 'Administrator', 'slug' => 'admin', 'description' => 'Full access to the system'],
            ['name' => 'Board Admin', 'slug' => 'board-admin', 'description' => 'Manage Board Members only'],
        ];

        foreach ($roles as $r) {
            Role::firstOrCreate(['slug' => $r['slug']], $r);
        }

        // Assign admin role to the default admin user if present
        $admin = User::where('email', 'admin@example.com')->first();
        $adminRole = Role::where('slug', 'admin')->first();
        if ($admin && $adminRole) {
            $admin->role()->associate($adminRole);
            $admin->save();
        }
    }
}

