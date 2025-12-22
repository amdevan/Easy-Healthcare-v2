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
                'image_url' => 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
                'link_url' => '/find-doctors',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Book lab tests online',
                'subtitle' => 'Home collection available in major cities',
                'image_url' => 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80',
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