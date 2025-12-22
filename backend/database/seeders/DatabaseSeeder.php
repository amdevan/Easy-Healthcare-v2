<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Specialty;
use App\Models\Doctor;
use App\Models\LabTest;
use App\Models\Article;
use App\Models\User;
use Database\Seeders\AppointmentSeeder;
use Database\Seeders\FaqSeeder;
use Database\Seeders\BannerSeeder;
use Database\Seeders\TestimonialSeeder;
use Database\Seeders\UiSettingSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed specialties
        $specialties = [
            ['name' => 'Cardiology', 'slug' => 'cardiology', 'description' => 'Heart and cardiovascular care'],
            ['name' => 'Dermatology', 'slug' => 'dermatology', 'description' => 'Skin and hair care'],
            ['name' => 'Orthopedics', 'slug' => 'orthopedics', 'description' => 'Bone and joint care'],
            ['name' => 'Pediatrics', 'slug' => 'pediatrics', 'description' => 'Child health care'],
        ];
        foreach ($specialties as $s) {
            Specialty::firstOrCreate(['slug' => $s['slug']], $s);
        }

        // Seed doctors
        $doctors = [
            ['name' => 'Dr. A. Sharma', 'location' => 'Bengaluru', 'experience_years' => 12, 'rating' => 4.6],
            ['name' => 'Dr. K. Singh', 'location' => 'Delhi', 'experience_years' => 9, 'rating' => 4.4],
            ['name' => 'Dr. R. Mehta', 'location' => 'Mumbai', 'experience_years' => 15, 'rating' => 4.8],
        ];
        foreach ($doctors as $d) {
            Doctor::firstOrCreate(['name' => $d['name']], $d);
        }

        // Seed lab tests
        $labTests = [
            ['name' => 'Complete Blood Count (CBC)', 'code' => 'CBC', 'description' => 'Measures components of blood', 'price' => 299.00, 'duration_minutes' => 10, 'home_collection_available' => true],
            ['name' => 'Lipid Profile', 'code' => 'LIPID', 'description' => 'Cholesterol and triglycerides', 'price' => 799.00, 'duration_minutes' => 20, 'home_collection_available' => true],
            ['name' => 'Thyroid Profile', 'code' => 'THYROID', 'description' => 'TSH, T3, T4', 'price' => 499.00, 'duration_minutes' => 15, 'home_collection_available' => false],
        ];
        foreach ($labTests as $t) {
            LabTest::firstOrCreate(['code' => $t['code']], $t);
        }

        // Seed articles
        $articles = [
            [
                'title' => 'Understanding Blood Tests: A Simple Guide',
                'slug' => 'understanding-blood-tests',
                'content' => 'Blood tests help assess your overall health. This article explains common tests and what they mean.',
                'published_at' => now()->subDays(7),
            ],
            [
                'title' => 'Choosing the Right Doctor for You',
                'slug' => 'choosing-right-doctor',
                'content' => 'Finding a doctor is easier when you know what to look for. Here are practical tips.',
                'published_at' => now()->subDays(3),
            ],
            [
                'title' => 'Cardiology Basics: Heart Health 101',
                'slug' => 'cardiology-basics',
                'content' => 'Learn the essentials of maintaining a healthy heart and recognizing warning signs.',
                'published_at' => now()->subDay(),
            ],
        ];
        foreach ($articles as $a) {
            Article::firstOrCreate(['slug' => $a['slug']], $a);
        }

        // Seed an admin user for Filament login
        User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin',
                'password' => bcrypt('password'),
            ]
        );

        // Seed appointments
        $this->call(AppointmentSeeder::class);

        // Seed CMS content
        $this->call([
            FaqSeeder::class,
            BannerSeeder::class,
            TestimonialSeeder::class,
            UiSettingSeeder::class,
        ]);
    }
}
