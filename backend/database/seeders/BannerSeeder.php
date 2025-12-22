<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Banner;

class BannerSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'title' => 'Care you can trust',
                'subtitle' => 'Find top doctors and affordable lab tests',
                'image_url' => 'https://example.com/images/hero.jpg',
                'link_url' => '/find-doctors',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Book lab tests online',
                'subtitle' => 'Home collection available in major cities',
                'image_url' => 'https://example.com/images/lab.jpg',
                'link_url' => '/lab-tests',
                'order' => 2,
                'is_active' => true,
            ],
        ];

        foreach ($items as $i) {
            Banner::firstOrCreate(['title' => $i['title']], $i);
        }
    }
}