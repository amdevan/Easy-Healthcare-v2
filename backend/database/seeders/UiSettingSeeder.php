<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\UiSetting;

class UiSettingSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            ['key' => 'site.name', 'value' => ['text' => 'Easy Healthcare']],
            ['key' => 'site.tagline', 'value' => ['text' => 'Quality care, simplified']],
            ['key' => 'home.cta', 'value' => ['label' => 'Find Doctors', 'href' => '/find-doctors']],
            ['key' => 'header', 'value' => [
                'logo_url' => '/logo.svg',
                'cta' => [
                    'label' => 'Book Appointment',
                    'href' => '/video-consult',
                ],
                'links' => [
                    ['label' => 'Find Doctors', 'href' => '/find-doctors'],
                    ['label' => 'Lab Tests', 'href' => '/lab-tests'],
                    ['label' => 'About', 'href' => '/about'],
                ],
            ]],
            ['key' => 'footer', 'value' => [
                'text' => '© 2025 Easy Healthcare 101. All rights reserved.',
                'links' => [
                    ['label' => 'Privacy Policy', 'href' => '/privacy'],
                    ['label' => 'Terms of Service', 'href' => '/terms'],
                    ['label' => 'Contact', 'href' => '/contact'],
                ],
            ]],
        ];

        foreach ($items as $i) {
            UiSetting::updateOrCreate(['key' => $i['key']], ['value' => $i['value']]);
        }
    }
}