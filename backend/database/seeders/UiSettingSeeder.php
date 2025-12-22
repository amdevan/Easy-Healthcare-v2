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
            ['key' => 'home.slider', 'value' => [
                ['src' => 'https://images.unsplash.com/photo-1758691463384-771db2f192b3?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0', 'alt' => 'Health care'],
                ['src' => 'https://plus.unsplash.com/premium_photo-1663013549676-1eba5ea1d16e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0', 'alt' => 'Medical tools and accessories'],
                ['src' => 'https://images.unsplash.com/photo-1758691462321-9b6c98c40f7e?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0', 'alt' => 'Work desk with accessories'],
            ]],
            ['key' => 'home.diagnostics', 'value' => [
                'image' => 'https://images.unsplash.com/photo-1659353886973-ced1dfeab3ac?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0',
                'title' => 'Expand Your Practice. Offer Home Visits.',
                'subtitle' => 'Join our network of esteemed doctors providing compassionate care at patients\' homes.',
            ]],
            ['key' => 'home.download_app', 'value' => [
                'google_play_badge' => 'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png',
                'app_store_badge' => 'https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg',
            ]],
            ['key' => 'header', 'value' => [
                'top_bar' => [
                    'enabled' => true,
                    'address' => 'Kathmandu, Nepal',
                    'phone' => 'Support: +977 1-4510101',
                    'login_label' => 'Patient Login',
                    'login_href' => '/patient-login',
                    'action_buttons' => [
                        [
                            'label' => 'Book Appointment',
                            'href' => '/find-doctors',
                            'variant' => 'primary',
                        ],
                    ],
                ],
                'logo_url' => '/logo.svg',
                'logo_height' => 40,
                'brand_name' => 'Easy Healthcare 101',
                'show_brand_name' => true,
                'links' => [
                    ['label' => 'Video Consult', 'href' => '/telemedicine', 'type' => 'link'],
                    ['label' => 'Find Doctors & Clinics', 'href' => '/find-doctors', 'type' => 'link'],
                    ['label' => 'Health Package', 'href' => '/health-package', 'type' => 'link'],
                    ['label' => 'Membership', 'href' => '/membership', 'type' => 'link'],
                    ['label' => 'Lab Tests', 'href' => '/lab-tests', 'type' => 'link'],
                    ['label' => 'Easy Pharmacy', 'href' => '/pharmacy', 'type' => 'link'],
                    ['label' => 'Clinics & Locations', 'href' => '/clinics-locations', 'type' => 'link'],
                    ['label' => 'Our Services', 'href' => '#', 'type' => 'services_dropdown'],
                    ['label' => 'About', 'href' => '#', 'type' => 'about_dropdown'],
                    ['label' => 'Contact', 'href' => '/contact', 'type' => 'link'],
                ],
                'services_menu' => [
                    ['label' => 'Primary Health Care', 'href' => '/primary-health'],
                    ['label' => 'Digital Health & Telemedicine', 'href' => '/telemedicine'],
                    ['label' => 'Diagnostics & Laboratory', 'href' => '/lab-tests'],
                    ['label' => 'Health Package', 'href' => '/health-package'],
                    ['label' => 'Non-Emergency Medical Transport (NEMT)', 'href' => '/nemt'],
                    ['label' => 'Community Health Programs', 'href' => '/community-health'],
                ],
                'about_menu' => [
                    ['label' => 'About Us', 'href' => '/about', 'desc' => 'Mission, vision, values and our ecosystem.'],
                    ['label' => 'Board of Director', 'href' => '/about/board-of-director', 'desc' => 'Governance, strategy and oversight.'],
                    ['label' => 'Management Team', 'href' => '/about/management-team', 'desc' => 'Leadership across operations and innovation.'],
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
            ['key' => 'page.find-doctors', 'value' => [
                'title' => 'Find Doctors & Clinics',
                'subtitle' => 'Search and book appointments',
                'sections' => [
                    ['key' => 'search', 'title' => 'Find Care', 'content' => 'Search by specialty, location, and availability.'],
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
            ['key' => 'page.telemedicine', 'value' => [
                'title' => 'Digital Health & Telemedicine',
                'subtitle' => 'Care at your fingertips',
                'sections' => [
                    ['key' => 'intro', 'title' => 'Telemedicine', 'content' => 'Connect with doctors remotely.'],
                ],
            ]],
            ['key' => 'page.easy-pharmacy', 'value' => [
                'title' => 'Easy Pharmacy',
                'subtitle' => 'Affordable medications',
                'sections' => [
                    ['key' => 'intro', 'title' => 'Trusted Pharmacy', 'content' => 'Order medicines with home delivery.'],
                ],
            ]],
            ['key' => 'page.pharmacy', 'value' => [
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
            ['key' => 'page.products', 'value' => [
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
            ['key' => 'page.services', 'value' => [
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
            ['key' => 'page.primary-health', 'value' => [
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
            ['key' => 'page.community-health', 'value' => [
                'title' => 'Community Health Programs',
                'subtitle' => 'Health for all',
                'sections' => [
                    ['key' => 'initiatives', 'title' => 'Programs', 'content' => 'Community outreach and support.'],
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
