<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Testimonial;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'author_name' => 'Priya S.',
                'author_role' => 'Patient',
                'content' => 'Booking an appointment was quick and easy. Highly recommend!',
                'rating' => 5,
                'order' => 1,
                'is_active' => true,
            ],
            [
                'author_name' => 'Rahul K.',
                'author_role' => 'Patient',
                'content' => 'Affordable lab tests with home collection. Great service!',
                'rating' => 4,
                'order' => 2,
                'is_active' => true,
            ],
        ];

        foreach ($items as $i) {
            Testimonial::firstOrCreate(['author_name' => $i['author_name'], 'content' => $i['content']], $i);
        }
    }
}