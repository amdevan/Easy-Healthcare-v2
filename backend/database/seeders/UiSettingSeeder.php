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

            // Pages: initialize default content blocks for management
            ['key' => 'page.home', 'value' => [
                'title' => 'Home',
                'subtitle' => 'Welcome to Easy Healthcare',
                'sections' => [
                    ['key' => 'hero', 'title' => 'Better Care, Faster', 'content' => 'Discover doctors, tests, and services.'],
                    ['key' => 'highlights', 'title' => 'Highlights', 'content' => 'Top services and specialties.'],
                ],
            ]],
            ['key' => 'page.lab-tests', 'value' => [
                'title' => 'Lab Tests',
                'subtitle' => 'Diagnostics & Laboratory',
                'sections' => [
                    ['key' => 'intro', 'title' => 'Accurate Lab Services', 'content' => 'Book tests with transparent pricing.'],
                ],
            ]],
            ['key' => 'page.video-consult', 'value' => [
                'title' => 'Video Consult',
                'subtitle' => 'Talk to doctors online',
                'sections' => [
                    ['key' => 'intro', 'title' => 'Virtual Care', 'content' => 'Convenient consultations from anywhere.'],
                ],
            ]],
            ['key' => 'page.easy-pharmacy', 'value' => [
                'title' => 'Easy Pharmacy',
                'subtitle' => 'Affordable medications',
                'sections' => [
                    ['key' => 'intro', 'title' => 'Trusted Pharmacy', 'content' => 'Order medicines with home delivery.'],
                ],
            ]],
            ['key' => 'page.health-package', 'value' => [
                'title' => 'Health Package',
                'subtitle' => 'Healthcare essentials',
                'sections' => [
                    ['key' => 'catalog', 'title' => 'Product Catalog', 'content' => 'Browse curated health products.'],
                ],
            ]],
            ['key' => 'page.membership', 'value' => [
                'title' => 'Membership',
                'subtitle' => 'Exclusive benefits',
                'sections' => [
                    ['key' => 'tiers', 'title' => 'Plans & Pricing', 'content' => 'Choose a plan that fits you.'],
                ],
            ]],
            ['key' => 'page.clinics-locations', 'value' => [
                'title' => 'Clinics & Locations',
                'subtitle' => 'Find care near you',
                'sections' => [
                    ['key' => 'map', 'title' => 'Our Clinics', 'content' => 'Explore locations and services.'],
                ],
            ]],
            ['key' => 'page.our-services', 'value' => [
                'title' => 'Our Services',
                'subtitle' => 'Comprehensive healthcare',
                'sections' => [
                    ['key' => 'overview', 'title' => 'Service Overview', 'content' => 'Primary care, diagnostics, and more.'],
                ],
            ]],
            ['key' => 'page.about', 'value' => [
                'title' => 'About',
                'subtitle' => 'Our mission and values',
                'sections' => [
                    ['key' => 'story', 'title' => 'Our Story', 'content' => 'Quality care, simplified.'],
                ],
            ]],
            ['key' => 'page.contact', 'value' => [
                'title' => 'Contact',
                'subtitle' => 'Get in touch',
                'sections' => [
                    ['key' => 'form', 'title' => 'Contact Form', 'content' => 'We are here to help.'],
                ],
            ]],
            ['key' => 'page.primary-health-care', 'value' => [
                'title' => 'Primary Health Care',
                'subtitle' => 'Everyday care for families',
                'sections' => [
                    ['key' => 'intro', 'title' => 'Primary Care', 'content' => 'Preventive and routine services.'],
                ],
            ]],
            ['key' => 'page.digital-health-telemedicine', 'value' => [
                'title' => 'Digital Health & Telemedicine',
                'subtitle' => 'Care at your fingertips',
                'sections' => [
                    ['key' => 'intro', 'title' => 'Telemedicine', 'content' => 'Connect with doctors remotely.'],
                ],
            ]],
            ['key' => 'page.diagnostics-laboratory', 'value' => [
                'title' => 'Diagnostics & Laboratory',
                'subtitle' => 'Accurate testing',
                'sections' => [
                    ['key' => 'tests', 'title' => 'Diagnostics', 'content' => 'Comprehensive lab services.'],
                ],
            ]],
            ['key' => 'page.nemt', 'value' => [
                'title' => 'Non-Emergency Medical Transport (NEMT)',
                'subtitle' => 'Safe transportation',
                'sections' => [
                    ['key' => 'intro', 'title' => 'Transport Services', 'content' => 'Reliable NEMT options.'],
                ],
            ]],
            ['key' => 'page.community-health-programs', 'value' => [
                'title' => 'Community Health Programs',
                'subtitle' => 'Health for all',
                'sections' => [
                    ['key' => 'initiatives', 'title' => 'Programs', 'content' => 'Community outreach and support.'],
                ],
            ]],
            ['key' => 'page.website-setting', 'value' => [
                'title' => 'Website Setting',
                'subtitle' => 'Global website configurations',
                'sections' => [
                    ['key' => 'branding', 'title' => 'Branding', 'content' => 'Logo, colors, and typography.'],
                    ['key' => 'seo', 'title' => 'SEO', 'content' => 'Meta tags and social previews.'],
                ],
            ]],
            ['key' => 'page.about-us', 'value' => [
                'title' => 'About Us',
                'subtitle' => 'Who we are',
                'sections' => [
                    ['key' => 'mission', 'title' => 'Mission', 'content' => 'Improve access to quality care.'],
                ],
            ]],
            ['key' => 'page.board-of-director', 'value' => [
                'title' => 'Board of Director',
                'subtitle' => 'Leadership team',
                'sections' => [
                    ['key' => 'members', 'title' => 'Board Members', 'content' => 'Profiles of board leadership.'],
                ],
            ]],
            ['key' => 'page.management-team', 'value' => [
                'title' => 'Management Team',
                'subtitle' => 'Executive leadership',
                'sections' => [
                    ['key' => 'members', 'title' => 'Team Members', 'content' => 'Profiles of management team.'],
                ],
            ]],
        ];

        foreach ($items as $i) {
            UiSetting::updateOrCreate(['key' => $i['key']], ['value' => $i['value']]);
        }
    }
}
