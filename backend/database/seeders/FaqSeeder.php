<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Faq;

class FaqSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'question' => 'How do I book an appointment?',
                'answer' => 'Use the Appointments section to pick a doctor and time.',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'question' => 'Do you offer home sample collection?',
                'answer' => 'Yes, many lab tests support home collection. Check the test details.',
                'order' => 2,
                'is_active' => true,
            ],
        ];

        foreach ($items as $i) {
            Faq::firstOrCreate(['question' => $i['question']], $i);
        }
    }
}