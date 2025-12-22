<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Page;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pages = [
            [
                'title' => 'Home',
                'slug' => 'home',
                'seo_title' => 'Home - Easy Healthcare 101',
                'seo_description' => 'Welcome to Easy Healthcare 101. Your trusted partner for health and wellness, connecting you with top doctors and clinics.',
                'hero_image' => 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=80',
                'content' => [
                    [
                        'type' => 'hero_section',
                        'data' => [
                            'title' => 'Your Trusted Partner for Easy Healthcare',
                            'subtitle' => 'Connecting you with top doctors, online consultations, and trusted clinics for all your health needs.',
                            // 'image' => 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=80', // Commented out to enable HomeSlider
                        ],
                    ],
                    [
                        'type' => 'features_list',
                        'data' => [
                            'title' => 'Our Highlights',
                            'features' => [
                                [
                                    'title' => 'Top Specialists',
                                    'description' => 'Find experts across specialties.',
                                    'icon' => 'heroicon-o-academic-cap',
                                ],
                                [
                                    'title' => 'Video Consults',
                                    'description' => 'Connect with doctors 24/7.',
                                    'icon' => 'heroicon-o-video-camera',
                                ],
                                [
                                    'title' => 'In-Clinic Appointments',
                                    'description' => 'Book visits near you.',
                                    'icon' => 'heroicon-o-calendar',
                                ],
                            ],
                        ],
                    ],
                    [
                        'type' => 'online_consultation_section',
                        'data' => [
                            'title' => 'Consult top doctors online for any health concern',
                            'description' => 'Private online consultations with verified doctors in all specialties.'
                        ]
                    ],
                    [
                        'type' => 'in_clinic_consultation_section',
                        'data' => [
                            'title' => 'Book an appointment for an in-clinic consultation',
                            'subtitle' => 'Find experienced doctors across all specialties.'
                        ]
                    ],
                    [
                        'type' => 'diagnostics_section',
                        'data' => [
                            'title' => 'Expand Your Practice. Offer Home Visits.',
                            'subtitle' => 'Join our network of esteemed doctors providing compassionate care at patients\' homes. Increase your reach, manage your schedule flexibly, and boost your earnings.',
                            'image' => 'https://images.unsplash.com/photo-1659353886973-ced1dfeab3ac?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0',
                            'benefits' => [
                                ['id' => 'benefit-reach', 'text' => 'Expand your patient reach beyond the clinic.'],
                                ['id' => 'benefit-flexibility', 'text' => 'Enjoy a flexible schedule that you control.'],
                                ['id' => 'benefit-earnings', 'text' => 'Increase your earnings with premium home services.']
                            ]
                        ]
                    ],
                    [
                        'type' => 'articles_section',
                        'data' => [
                            'title' => 'Read top articles from health experts',
                            'subtitle' => 'Health articles that keep you informed about good health practices and achieve your goals.',
                            'default_image' => 'https://picsum.photos/400/300?grayscale'
                        ]
                    ],
                    [
                        'type' => 'testimonials_list',
                        'data' => [
                            'title' => 'What Our Patients Say',
                            'testimonials' => [
                                ['quote' => 'Great service!', 'author' => 'John Doe', 'role' => 'Patient'],
                                ['quote' => 'Very convenient.', 'author' => 'Jane Smith', 'role' => 'Patient'],
                            ]
                        ]
                    ],
                    [
                        'type' => 'download_app_section',
                        'data' => [
                            'title' => 'Download the Easy Healthcare 101 App',
                            'description' => 'Access video consultation with top doctors on the Easy Healthcare 101 app. Connect with doctors online, available 24/7, from the comfort of your home.',
                            'cta_text' => 'Get the link to download the app',
                            'google_play_badge' => 'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png',
                            'app_store_badge' => 'https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg',
                            'image' => 'https://picsum.photos/300/600'
                        ]
                    ],
                    [
                        'type' => 'call_to_action',
                        'data' => [
                            'title' => 'Ready to get started?',
                            'description' => 'Join thousands of satisfied patients who trust Easy Healthcare 101.',
                            'button_text' => 'Find Doctors',
                            'button_url' => '/find-doctors',
                        ],
                    ],
                ],
            ],
            [
                'title' => 'Find Doctors',
                'slug' => 'find-doctors',
                'seo_title' => 'Find Doctors - Easy Healthcare 101',
                'seo_description' => 'Search for top-rated specialists and book appointments with ease.',
                'hero_image' => 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1920&q=80',
                'content' => [
                    [
                        'type' => 'hero_section',
                        'data' => [
                            'title' => 'Find Doctors Near You',
                            'subtitle' => 'Search for top-rated specialists and book appointments with ease.',
                            'image' => 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1920&q=80',
                        ],
                    ],
                    [
                        'type' => 'text_block',
                        'data' => [
                            'content' => '<p>Use our advanced search to find the right doctor for your needs. Filter by specialty, location, and availability.</p>',
                        ],
                    ],
                ],
            ],
            [
                'title' => 'Telemedicine',
                'slug' => 'telemedicine',
                'seo_title' => 'Telemedicine - Easy Healthcare 101',
                'seo_description' => 'Experience the future of medicine with secure remote consultations.',
                'hero_image' => 'https://images.unsplash.com/photo-1758691461916-dc7894eb8f94?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0',
                'content' => [
                    [
                        'type' => 'hero_section',
                        'data' => [
                            'title' => 'Expert Care, Just a Click Away.',
                            'subtitle' => 'Experience the future of medicine with secure remote consultations, high-quality video calls, and instant digital prescriptions. Quality healthcare, now from the comfort of your home.',
                            'image' => 'https://images.unsplash.com/photo-1758691461916-dc7894eb8f94?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.1.0',
                        ],
                    ],
                    [
                        'type' => 'overview_section',
                        'data' => [
                            'title' => 'Seamless Digital Healthcare',
                            'description' => 'Our telemedicine platform bridges the gap between you and top-tier medical professionals.',
                            'items' => [
                                ['label' => 'Verified Doctors', 'value' => '100%'],
                                ['label' => 'Consultations', 'value' => '50k+'],
                                ['label' => 'Patient Satisfaction', 'value' => '4.9/5']
                            ]
                        ]
                    ],
                    [
                        'type' => 'features_section',
                        'data' => [
                            'title' => 'Why Choose Telemedicine?',
                            'subtitle' => 'Modern healthcare features designed for your convenience.',
                            'items' => [
                                [
                                    'title' => 'HD Video Calls',
                                    'description' => 'Crystal clear video consultation experience.',
                                    'icon' => 'heroicon-o-video-camera',
                                ],
                                [
                                    'title' => 'Secure & Private',
                                    'description' => 'Your health data is fully encrypted and safe.',
                                    'icon' => 'heroicon-o-shield-check',
                                ],
                                [
                                    'title' => '24/7 Availability',
                                    'description' => 'Access healthcare whenever you need it.',
                                    'icon' => 'heroicon-o-clock',
                                ],
                                [
                                    'title' => 'Digital Prescriptions',
                                    'description' => 'Receive prescriptions instantly after your call.',
                                    'icon' => 'heroicon-o-document-text',
                                ]
                            ],
                        ],
                    ],
                    [
                        'type' => 'benefits_section',
                        'data' => [
                            'title' => 'Benefits of Virtual Care',
                            'description' => 'Save time and avoid waiting rooms.',
                            'image' => 'https://picsum.photos/400/500?grayscale&blur=2',
                            'imageCaption' => 'Patient consulting from home',
                            'items' => [
                                'No travel time required',
                                'Access to specialists globally',
                                'Reduced exposure to illness',
                                'Cost-effective solutions'
                            ]
                        ]
                    ],
                    [
                        'type' => 'programs_section',
                        'data' => [
                            'title' => 'Specialized Programs',
                            'description' => 'Targeted care for specific health needs.',
                            'items' => [
                                ['title' => 'Mental Health', 'description' => 'Therapy and counseling sessions.'],
                                ['title' => 'Chronic Care', 'description' => 'Ongoing management for diabetes and hypertension.'],
                                ['title' => 'Dermatology', 'description' => 'Skin consultations and follow-ups.']
                            ]
                        ]
                    ],
                    [
                        'type' => 'tech_platform',
                        'data' => [
                            'title' => 'Built on Advanced Technology',
                            'description' => 'Our platform combines ease of use with powerful medical tools, ensuring a seamless experience for both patients and providers.',
                            'image' => 'https://picsum.photos/600/600?grayscale',
                            'items' => [
                                'AI-assisted symptom checker',
                                'Integrated electronic health records',
                                'Multi-device compatibility'
                            ]
                        ]
                    ],
                    [
                        'type' => 'how_it_works',
                        'data' => [
                            'title' => 'How It Works',
                            'subtitle' => 'Get started in 3 simple steps.',
                            'steps' => [
                                ['title' => 'Sign Up', 'description' => 'Create your free account.'],
                                ['title' => 'Choose a Doctor', 'description' => 'Browse profiles and availability.'],
                                ['title' => 'Start Consultation', 'description' => 'Connect via video call.']
                            ]
                        ]
                    ],
                    [
                        'type' => 'impact_section',
                        'data' => [
                            'title' => 'Making a Real Impact',
                            'items' => [
                                ['title' => 'Rural Access', 'description' => 'Bringing care to remote areas.'],
                                ['title' => 'Wait Times', 'description' => 'Reducing average wait to under 15 mins.']
                            ]
                        ]
                    ],
                    [
                        'type' => 'cta_section',
                        'data' => [
                            'title' => 'Book an Online Consultation',
                            'description' => 'Connect with a doctor today from the comfort of your home.',
                            'buttonText' => 'Book Now',
                            'supportText' => 'Need help? Contact support.'
                        ],
                    ],
                ],
            ],
            [
                'title' => 'Primary Health',
                'slug' => 'primary-health',
                'seo_title' => 'Primary Health - Easy Healthcare 101',
                'seo_description' => 'Accessible, affordable, and high-quality general outpatient services.',
                'hero_image' => 'https://plus.unsplash.com/premium_photo-1663050906605-faa2aa0e5ff8?q=80&w=2670&auto=format&fit=crop',
                'content' => [
                    [
                        'type' => 'hero_section',
                        'data' => [
                            'title' => 'Primary Care Built on Trust & Continuity',
                            'subtitle' => 'Accessible, affordable, and high-quality general outpatient services. We believe in building long-term relationships for better health outcomes.',
                            'image' => 'https://plus.unsplash.com/premium_photo-1663050906605-faa2aa0e5ff8?q=80&w=2670&auto=format&fit=crop',
                        ],
                    ],
                    [
                        'type' => 'about_section',
                        'data' => [
                            'title' => 'Dedicated to Continuous & Affordable Care',
                            'subtitle' => 'About Primary Health Care',
                            'description' => '<p class="mb-4">Founded on the belief that healthcare should be a right, not a privilege, our Primary Health Care service focuses on reducing barriers to quality medical attention. We specialize in general outpatient services designed to fit your busy life.</p><p>Our "Continuity of Care" model ensures you see the same team of professionals who know your history, preferences, and health goals. From minor check-ups to managing complex chronic conditions, we walk the journey with you.</p>',
                            'images' => [
                                'https://picsum.photos/400/500?grayscale',
                                'https://picsum.photos/400/500?blur=2'
                            ]
                        ]
                    ],
                    [
                         'type' => 'services_section',
                         'data' => [
                             'title' => 'Holistic Clinical Services',
                             'subtitle' => 'Our Capabilities',
                             'description' => 'We provide a wide range of primary care services designed to be affordable and accessible. Our focus is on your continuous well-being.',
                             'items' => [
                                 ['title' => 'General Outpatient', 'description' => 'Comprehensive diagnosis and treatment for common illnesses, infections, and minor injuries with minimal wait times.'],
                                 ['title' => 'Chronic Disease Management', 'description' => 'Ongoing support for diabetes, hypertension, asthma, and other long-term conditions to ensure stable health.'],
                                 ['title' => 'Preventive Care', 'description' => 'Regular health screenings, immunizations, and wellness check-ups to catch issues before they become serious.'],
                                 ['title' => 'Pediatric & Family Care', 'description' => 'Gentle, specialized care for children and comprehensive health plans for the entire family unit.'],
                                 ['title' => 'Diagnostic Labs', 'description' => 'On-site blood work and sample collection for rapid diagnosis and faster treatment planning.'],
                                 ['title' => 'Cardiovascular Health', 'description' => 'Monitoring heart health, blood pressure management, and cholesterol screenings.'],
                                 ['title' => 'Pharmacy Services', 'description' => 'Convenient access to prescription medications and expert pharmacist consultations.'],
                                 ['title' => 'Mental Wellness', 'description' => 'Basic counseling and referrals for mental health support, treating the mind alongside the body.'],
                             ]
                         ]
                    ],
                    [
                        'type' => 'appointment_section',
                        'data' => [
                            'title' => 'Book Your Consultation',
                            'subtitle' => 'Prioritize your health with our flexible scheduling. We offer same-day appointments for acute needs and convenient slots for routine check-ups.'
                        ]
                    ]
                ],
            ],
            [
                'title' => 'NEMT',
                'slug' => 'nemt',
                'seo_title' => 'Non-Emergency Medical Transportation - Easy Healthcare 101',
                'seo_description' => 'Professional NEMT ensuring safe, comfortable, and dignified travel.',
                'hero_image' => 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1000&auto=format&fit=crop',
                'content' => [
                    [
                        'type' => 'hero_section',
                        'data' => [
                            'title' => 'Care That Goes The Extra Mile',
                            'subtitle' => 'Professional Non-Emergency Medical Transportation (NEMT) ensuring safe, comfortable, and dignified travel for you and your loved ones.',
                            'image' => 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1000&auto=format&fit=crop',
                        ],
                    ],
                    [
                        'type' => 'services_section',
                        'data' => [
                            'label' => 'Our Services',
                            'title' => 'Comprehensive Transportation Solutions',
                            'description' => 'We provide more than just a ride; we provide care.',
                            'items' => [
                                [
                                    'title' => 'Licensed & Insured',
                                    'description' => 'Fully compliant with safety regulations.',
                                    'icon' => 'heroicon-o-check-badge',
                                ],
                                [
                                    'title' => '24/7 Availability',
                                    'description' => 'Round-the-clock transportation support.',
                                    'icon' => 'heroicon-o-clock',
                                ],
                                [
                                    'title' => 'BLS Trained Staff',
                                    'description' => 'Drivers trained in Basic Life Support.',
                                    'icon' => 'heroicon-o-heart',
                                ],
                                [
                                    'title' => 'Door-to-Door Service',
                                    'description' => 'We assist you from your door to the vehicle and into your appointment.',
                                    'icon' => 'heroicon-o-home',
                                ]
                            ],
                        ],
                    ],
                    [
                        'type' => 'vehicles_list',
                        'data' => [
                            'label' => 'Our Fleet',
                            'title' => 'Specialized Vehicles for Every Need',
                            'description' => 'Our modern fleet is equipped to handle various mobility requirements safely and comfortably.',
                            'features_label' => 'Key Features',
                            'cta_text' => 'Select Vehicle',
                            'vehicles' => [
                                [
                                    'id' => 'basic',
                                    'name' => 'Basic NEMT Van',
                                    'description' => 'Comfortable transport for ambulatory patients who need supervision.',
                                    'features' => ['Comfortable Seating', 'Climate Control', 'GPS Tracking'],
                                    'image' => 'https://picsum.photos/600/400?random=1'
                                ],
                                [
                                    'id' => 'wheelchair',
                                    'name' => 'Wheelchair-Accessible Van',
                                    'description' => 'Equipped with hydraulic lifts or ramps and safety harnesses.',
                                    'features' => ['Hydraulic Lift/Ramp', 'Safety Harness', 'Attendant Seat'],
                                    'image' => 'https://picsum.photos/600/400?random=2'
                                ],
                                [
                                    'id' => 'stretcher',
                                    'name' => 'Stretcher / BLS Van',
                                    'description' => 'For patients unable to sit upright, requiring stretcher transport.',
                                    'features' => ['Medical Stretcher', 'Oxygen Support', 'BLS Trained Staff'],
                                    'image' => 'https://picsum.photos/600/400?random=3'
                                ]
                            ]
                        ]
                    ],
                    [
                        'type' => 'pricing_section',
                        'data' => [
                            'label' => 'Pricing',
                            'title' => 'Transparent Pricing',
                            'description' => 'Affordable rates with no hidden fees. Insurance accepted.',
                            'ctaText' => 'Get a Quote',
                            'disclaimer' => '* Prices may vary based on distance and specific needs.',
                            'tiers' => [
                                [
                                    'name' => 'Ambulatory',
                                    'price' => '$30',
                                    'unit' => 'base rate',
                                    'features' => ['Curbside assistance', 'Foldable walker storage', 'Up to 2 passengers'],
                                    'highlighted' => false
                                ],
                                [
                                    'name' => 'Wheelchair',
                                    'price' => '$45',
                                    'unit' => 'base rate',
                                    'features' => ['Lift/Ramp service', 'Secure wheelchair lockdown', '1 companion included'],
                                    'highlighted' => true
                                ],
                                [
                                    'name' => 'Stretcher',
                                    'price' => '$100',
                                    'unit' => 'base rate',
                                    'features' => ['Two-man crew', 'Bed-to-bed service', 'Oxygen available'],
                                    'highlighted' => false
                                ]
                            ]
                        ]
                    ],
                    [
                        'type' => 'booking_section',
                        'data' => [
                            'title' => 'Book Your Ride',
                            'description' => 'Schedule your transportation easily online.',
                            'labels' => [
                                'pickup' => 'Pickup Location',
                                'dropoff' => 'Drop-off Location',
                                'date' => 'Date',
                                'time' => 'Time',
                                'vehicle' => 'Preferred Vehicle',
                                'submit' => 'Book Now'
                            ],
                            'placeholders' => [
                                'pickup' => 'Enter pickup address',
                                'dropoff' => 'Enter destination address',
                                'date' => 'Select date',
                                'time' => 'Select time',
                                'vehicle' => 'Select a vehicle type'
                            ],
                            'success' => [
                                'title' => 'Booking Received!',
                                'message' => 'We will confirm your ride shortly.'
                            ]
                        ]
                    ]
                ],
            ],
            [
                'title' => 'Services',
                'slug' => 'services',
                'seo_title' => 'Our Services - Easy Healthcare 101',
                'seo_description' => 'Explore our comprehensive healthcare services.',
                'hero_image' => 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1920&q=80',
                'content' => [
                    [
                        'type' => 'hero_section',
                        'data' => [
                            'title' => 'Our Services',
                            'subtitle' => 'Comprehensive healthcare solutions tailored to your needs.',
                            'image' => 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1920&q=80',
                        ],
                    ],
                    [
                        'type' => 'features_list',
                        'data' => [
                            'title' => 'Our Healthcare Services',
                            'features' => [
                                [
                                    'title' => 'Primary Health Care',
                                    'description' => 'Comprehensive outpatient care with general physicians and specialists for immediate, preventive, and routine health needs.',
                                    'icon' => 'Stethoscope',
                                    'url' => '/find-doctors'
                                ],
                                [
                                    'title' => 'Laboratory & Diagnostic Services',
                                    'description' => 'High-quality diagnostic services integrated with digital reporting, home sample collection, and partner imaging support.',
                                    'icon' => 'FlaskConical',
                                    'url' => '/lab-tests'
                                ],
                                [
                                    'title' => 'Health Package',
                                    'description' => 'Curated health packages for preventive, family, and chronic-care needs with transparent inclusions and pricing.',
                                    'icon' => 'Package',
                                    'url' => '/health-package'
                                ],
                                [
                                    'title' => 'Non-Emergency Medical Transportation (NEMT)',
                                    'description' => 'Safe and reliable transport for non-critical patients requiring mobility support, scheduled visits, and hospital appointments.',
                                    'icon' => 'Ambulance',
                                    'url' => '/nemt'
                                ],
                                [
                                    'title' => 'Digital Health & Telemedicine',
                                    'description' => 'Remote consultations with doctors through secure telemedicine, offering e-prescriptions, EMR integration, and virtual assistance.',
                                    'icon' => 'Video',
                                    'url' => '/video-consult'
                                ],
                                [
                                    'title' => 'Community Health Programs',
                                    'description' => 'Preventive health initiatives including community screenings, corporate health camps, immunization drives, and awareness programs.',
                                    'icon' => 'Users',
                                    'url' => '/community-health'
                                ]
                            ]
                        ]
                    ],
                    [
                        'type' => 'cta_section',
                        'data' => [
                            'title' => 'Ready to prioritize your health?',
                            'description' => 'Book an appointment today or consult with our specialists online. Your journey to better health starts here.',
                            'button_text' => 'Book Now',
                            'button_url' => '/find-doctors'
                        ]
                    ],
                    [
                        'type' => 'stats_section',
                        'data' => [
                            'items' => [
                                ['value' => '24/7', 'label' => 'SUPPORT'],
                                ['value' => '50+', 'label' => 'SPECIALISTS'],
                                ['value' => '10k+', 'label' => 'PATIENTS'],
                                ['value' => '98%', 'label' => 'SATISFACTION']
                            ]
                        ]
                    ],
                ],
            ],
            [
                'title' => 'About Us',
                'slug' => 'about',
                'seo_title' => 'About Us - Easy Healthcare 101',
                'seo_description' => 'Learn more about our mission and values.',
                'hero_image' => 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80',
                'content' => [
                    [
                        'type' => 'hero_section',
                        'data' => [
                            'title' => 'About Easy Healthcare 101',
                            'subtitle' => 'Dedicated to improving healthcare accessibility for everyone.',
                            'description' => 'We are a team of healthcare professionals and technology experts working together to make healthcare accessible, affordable, and convenient for everyone.',
                            'image' => 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80',
                        ],
                    ],
                    [
                        'type' => 'about_section',
                        'data' => [
                            'title' => 'About Easy Health Care Pvt. Ltd.',
                            'subtitle' => 'Who We Are',
                            'description' => 'Bringing together clinical care, telemedicine, pharmacy, and diagnostics under one seamless ecosystem — making healthcare simple, connected, and patient-centered.',
                            'images' => [
                                'https://picsum.photos/400/500?grayscale',
                                'https://picsum.photos/400/500?blur=2'
                            ],
                        ],
                    ],
                    [
                        'type' => 'core_values',
                        'data' => [
                            'mission' => [
                                'title' => 'Our Mission',
                                'description' => 'To make healthcare simple, connected, and inclusive by integrating technology, professional care, and community-based models — ensuring that quality health services are available to everyone, everywhere.',
                                'icon' => 'Target'
                            ],
                            'vision' => [
                                'title' => 'Our Vision',
                                'description' => 'To become Nepal\'s most trusted and innovative primary healthcare network, leading the transformation of healthcare delivery through digital integration, patient-centered care, and sustainable partnerships.',
                                'icon' => 'Eye'
                            ],
                            'values' => [
                                'title' => 'Our Values',
                                'icon' => 'Heart',
                                'items' => [
                                    ['title' => 'Compassion', 'description' => 'Empathy in every interaction.'],
                                    ['title' => 'Integrity', 'description' => 'Transparency guides us.'],
                                    ['title' => 'Accessibility', 'description' => 'Care within everyone\'s reach.'],
                                    ['title' => 'Innovation', 'description' => 'Tech that simplifies care.']
                                ]
                            ]
                        ]
                    ],
                    [
                        'type' => 'our_story',
                        'data' => [
                            'title' => 'Transforming Healthcare Access in Nepal',
                            'subtitle' => 'Who We Are',
                            'description_1' => 'Easy Health Care Pvt. Ltd. (Easy Health Care 101) is a forward-thinking healthcare organization dedicated to providing accessible, affordable, and high-quality health services to individuals, families, and communities.',
                            'description_2' => 'Founded with a vision to bridge the gap between traditional care and modern digital health, we blend technology, compassion, and community outreach to ensure continuous and personalized care — at our clinics, at home, or online.',
                            'quote' => 'We bring together clinical care, telemedicine, pharmacy, and diagnostics under one seamless ecosystem.',
                            'image' => 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1200&auto=format&fit=crop',
                            'services' => [
                                'Clinical Care',
                                'Telemedicine',
                                'Pharmacy Services',
                                'Diagnostics',
                                'Medical Logistics'
                            ]
                        ]
                    ],
                    [
                        'type' => 'ecosystem_section',
                        'data' => [
                            'title' => 'Integrated Ecosystem',
                            'subtitle' => 'A 360° Approach to Your Health',
                            'items' => [
                                [
                                    'title' => 'Clinics',
                                    'description' => 'Primary care & diagnostics centers with modern facilities.',
                                    'icon' => 'Building2',
                                    'color' => 'blue'
                                ],
                                [
                                    'title' => 'Pharmacy',
                                    'description' => 'Retail & Online access to affordable, authentic medicines.',
                                    'icon' => 'Pill',
                                    'color' => 'green'
                                ],
                                [
                                    'title' => 'Digital Health',
                                    'description' => 'Teleconsultation, booking & EHR management platform.',
                                    'icon' => 'Smartphone',
                                    'color' => 'purple'
                                ],
                                [
                                    'title' => 'Diagnostics',
                                    'description' => 'Central lab services and reliable home sample collection.',
                                    'icon' => 'Activity',
                                    'color' => 'rose'
                                ]
                            ]
                        ]
                    ],
                    [
                        'type' => 'impact_section',
                        'data' => [
                            'title' => 'Our Impact So Far',
                            'subtitle' => 'Making a difference where it counts',
                            'stats' => [
                                ['label' => 'Clinics', 'value' => '50+', 'icon' => 'Building'],
                                ['label' => 'Patients Served', 'value' => '100k+', 'icon' => 'Users'],
                                ['label' => 'Doctors', 'value' => '500+', 'icon' => 'Stethoscope'],
                                ['label' => 'Prescriptions', 'value' => '1M+', 'icon' => 'FileText']
                            ],
                            'areas' => [
                                ['title' => 'Rural Outreach', 'description' => 'Bringing healthcare to underserved remote villages.'],
                                ['title' => 'Women\'s Health', 'description' => 'Specialized camps and education for maternal health.'],
                                ['title' => 'Chronic Disease', 'description' => 'Long-term management programs for diabetes and hypertension.']
                            ]
                        ]
                    ],
                    [
                        'type' => 'future_section',
                        'data' => [
                            'title' => 'Where We Are Going',
                            'subtitle' => 'The Future of Healthcare',
                            'steps' => [
                                [
                                    'year' => '2024',
                                    'title' => 'Network Expansion',
                                    'description' => 'Expanding to 100+ clinics across the country.'
                                ],
                                [
                                    'year' => '2025',
                                    'title' => 'AI Diagnostics',
                                    'description' => 'Launching AI-powered diagnostic tools for faster results.'
                                ],
                                [
                                    'year' => '2026',
                                    'title' => 'Nationwide Coverage',
                                    'description' => 'Ensuring every citizen is within 30 mins of care.'
                                ]
                            ]
                        ]
                    ],
                    [
                        'type' => 'cta_section',
                        'data' => [
                            'badge' => 'Join our Community',
                            'title' => 'Ready to Experience Connected Care?',
                            'description' => 'Join thousands of patients who trust Easy Health Care. Whether you need a checkup, home care, or digital consultation, we are here for you.',
                            'primary_button_text' => 'Book an Appointment',
                            'primary_button_link' => '/book-appointment',
                            'secondary_links' => [
                                ['text' => 'Partner with Us', 'link' => '/partner', 'icon' => 'Users'],
                                ['text' => 'Find Locations', 'link' => '/clinics-locations', 'icon' => 'MapPin'],
                                ['text' => 'Call Support', 'link' => 'tel:+97714510101', 'icon' => 'Phone']
                            ]
                        ]
                    ],
                ],
            ],
            [
                'title' => 'Contact Us',
                'slug' => 'contact',
                'seo_title' => 'Contact Us - Easy Healthcare 101',
                'seo_description' => 'Get in touch with us for any queries or support.',
                'hero_image' => 'https://images.unsplash.com/photo-1423666639041-f142fcb93315?auto=format&fit=crop&w=1920&q=80',
                'content' => [
                    [
                        'type' => 'hero_section',
                        'data' => [
                            'title' => 'Contact Us',
                            'description' => 'We’re here to help with appointments, services, and membership. Call us or send a message below.',
                            'image' => 'https://images.unsplash.com/photo-1423666639041-f142fcb93315?auto=format&fit=crop&w=1920&q=80',
                        ],
                    ],
                    [
                        'type' => 'contact_info',
                        'data' => [
                            'phone' => '+977 1-4510101',
                            'email' => 'support@easyhealthcare101.com',
                            'address' => 'Kathmandu, Nepal',
                            'hours' => "Mon–Fri: 9:00–18:00\nSat: 10:00–16:00",
                            'map_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.087931694395!2d85.3239606!3d27.7122984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a8b6b1c2a9%3A0x3b2b4c8a2b1b!2sKathmandu!5e0!3m2!1sen!2snp!4v1700000000000'
                        ]
                    ],
                    [
                        'type' => 'form_section',
                        'data' => [
                            'title' => 'Send us a Message',
                            'labels' => [
                                'name' => 'Full Name',
                                'email' => 'Email',
                                'phone' => 'Phone',
                                'subject' => 'Subject',
                                'message' => 'Message',
                                'submit' => 'Send Message',
                                'submitting' => 'Sending...',
                            ],
                            'placeholders' => [
                                'name' => 'Jane Doe',
                                'email' => 'you@example.com',
                                'phone' => '+977-9800000000',
                                'subject' => 'How can we help?',
                                'message' => 'Your message here...',
                            ],
                            'messages' => [
                                'success' => 'Thank you! Your message has been sent.',
                                'error' => 'Something went wrong. Please try again.'
                            ]
                        ]
                    ],
                ],
            ],
            [
                'title' => 'Health Packages',
                'slug' => 'health-package',
                'seo_title' => 'Health Packages - Easy Healthcare 101',
                'seo_description' => 'Affordable health packages for you and your family.',
                'hero_image' => 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1920&q=80',
                'content' => [
                    [
                        'type' => 'hero_section',
                        'data' => [
                            'title' => 'Health Packages Designed Around Your Life',
                            'subtitle' => 'Browse preventive, family, and chronic-care packages. Simple, clear inclusions and pricing.',
                            'image' => 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1920&q=80',
                        ],
                    ],
                    [
                        'type' => 'packages_section',
                        'data' => [
                            'packages' => [
                                [
                                    'id' => 'pkg_basic',
                                    'name' => 'Basic Wellness',
                                    'price' => 2999,
                                    'description' => 'Essential health checkup for young adults.',
                                    'features' => ['CBC', 'Lipid Profile', 'Blood Sugar', 'Urine Routine'],
                                    'is_popular' => false,
                                    'category' => 'Preventive'
                                ],
                                [
                                    'id' => 'pkg_comprehensive',
                                    'name' => 'Comprehensive Care',
                                    'price' => 5999,
                                    'description' => 'Full-body checkup including advanced markers.',
                                    'features' => ['All Basic Features', 'Thyroid Profile', 'Liver Function', 'Kidney Function', 'ECG'],
                                    'is_popular' => true,
                                    'category' => 'Family'
                                ],
                                [
                                    'id' => 'pkg_senior',
                                    'name' => 'Senior Citizen',
                                    'price' => 7999,
                                    'description' => 'Specialized care for ages 60+.',
                                    'features' => ['Comprehensive Features', 'Bone Density', 'Vitamin D & B12', 'Cardiac Risk Markers'],
                                    'is_popular' => false,
                                    'category' => 'Chronic'
                                ]
                            ]
                        ]
                    ],
                    [
                        'type' => 'basics_section',
                        'data' => [
                            'title' => 'Beyond the Basics',
                            'description' => 'Personalize your healthcare experience with our premium add-on services available across all packages.',
                            'items' => [
                                'Home Sample Collection',
                                'Doctor Consultation',
                                'Diet Consultation',
                                'Health Manager Support'
                            ]
                        ]
                    ],
                    [
                        'type' => 'cta_section',
                        'data' => [
                            'title' => 'Your Health Journey Starts Here',
                            'description' => 'Join thousands who trust Easy Healthcare 101 for preventive and chronic care needs. Simple, transparent, and effective.',
                            'button_text' => 'Book Consultation',
                            'button_url' => '/video-consult'
                        ]
                    ]
                ],
            ],
            [
                'title' => 'Lab Tests',
                'slug' => 'lab-tests',
                'seo_title' => 'Lab Tests - Easy Healthcare 101',
                'seo_description' => 'Book lab tests from trusted NABL-certified labs.',
                'hero_image' => 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1920&q=80',
                'content' => [
                    [
                        'type' => 'hero_section',
                        'data' => [
                            'title' => 'Lab Testing, Reimagined',
                            'subtitle' => 'Book lab tests from trusted NABL-certified labs, get home sample collection, and receive digital reports—fast, secure, and hassle-free.',
                            'image' => 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1920&q=80',
                            'stats' => [
                                ['value' => '500+', 'label' => 'Tests Available'],
                                ['value' => '50+', 'label' => 'Partner Labs'],
                                ['value' => '24h', 'label' => 'Report Delivery']
                            ]
                        ],
                    ],
                    [
                        'type' => 'features_section',
                        'data' => [
                            'title' => 'Why Choose Our Labs?',
                            'description' => 'We prioritize accuracy, convenience, and speed.',
                            'items' => [
                                [
                                    'title' => 'NABL Certified',
                                    'description' => 'Partnered with top-tier certified labs.',
                                    'icon' => 'heroicon-o-check-badge',
                                ],
                                [
                                    'title' => 'Home Collection',
                                    'description' => 'Convenient sample collection from your home.',
                                    'icon' => 'heroicon-o-truck',
                                ],
                                [
                                    'title' => 'Digital Reports',
                                    'description' => 'Get reports delivered to your phone in 24-48 hours.',
                                    'icon' => 'heroicon-o-document-text',
                                ],
                            ],
                        ],
                    ],
                    [
                        'type' => 'process_section',
                        'data' => [
                            'title' => 'How It Works',
                            'description' => 'Simple steps to get your tests done.',
                            'steps' => [
                                ['title' => 'Book Test', 'description' => 'Select test and schedule pickup.'],
                                ['title' => 'Sample Collection', 'description' => 'Phlebotomist visits your home.'],
                                ['title' => 'Get Report', 'description' => 'Receive digital report online.']
                            ]
                        ]
                    ]
                ],
            ],
            [
                'title' => 'Clinics & Locations',
                'slug' => 'clinics-locations',
                'seo_title' => 'Clinics & Locations - Easy Healthcare 101',
                'seo_description' => 'Find our world-class clinics and hospitals near you.',
                'hero_image' => 'https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?auto=format&fit=crop&q=80&w=2000',
                'content' => [
                    [
                        'type' => 'hero_section',
                        'data' => [
                            'title' => 'World-Class Care, Powered by Innovation',
                            'subtitle' => 'Experience state-of-the-art infrastructure and advanced medical technology across our network of accredited clinics and specialized centers.',
                            'image' => 'https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?auto=format&fit=crop&q=80&w=2000',
                            'badge' => 'Leading Medical Infrastructure & Technology',
                            'primary_button_text' => 'Find Nearest Clinic',
                            'primary_button_link' => '#locations',
                            'secondary_button_text' => 'Explore Technology',
                            'secondary_button_link' => '#infrastructure'
                        ],
                    ],
                    [
                        'type' => 'locations_list',
                        'data' => [
                            'title' => 'Clinics & Centers',
                            'subtitle' => 'Our Network',
                            'description' => 'Find comprehensive care across our accredited locations offering specialized services and advanced diagnostics.',
                            'locations' => [
                                [
                                    'id' => 1,
                                    'name' => 'MedCore Central Hospital',
                                    'type' => 'Flagship Center',
                                    'address' => '1200 Healthcare Blvd, Metro City, ST 90210',
                                    'phone' => '(555) 123-4567',
                                    'hours' => 'Open 24/7',
                                    'image' => 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=1200',
                                    'features' => ['Emergency 24/7', 'Trauma Center', 'Advanced Cardiology'],
                                    'tech_specs' => ['3T MRI', 'Robotic Surgery Suite', 'Hybrid Cath Lab'],
                                    'is_primary' => true
                                ],
                                [
                                    'id' => 2,
                                    'name' => 'Westside Family Clinic',
                                    'type' => 'Outpatient Clinic',
                                    'address' => '450 West Avenue, Suite 100, Westside, ST 90212',
                                    'phone' => '(555) 987-6543',
                                    'hours' => 'Mon-Sat: 8:00 AM - 8:00 PM',
                                    'image' => 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200',
                                    'features' => ['Pediatrics', 'Family Medicine', 'Vaccination Center'],
                                    'tech_specs' => ['Digital X-Ray', 'Telemedicine Kiosk'],
                                    'is_primary' => false
                                ],
                                [
                                    'id' => 3,
                                    'name' => 'North Hills Specialist Center',
                                    'type' => 'Specialty Hub',
                                    'address' => '880 North Rise Dr, North Hills, ST 90214',
                                    'phone' => '(555) 456-7890',
                                    'hours' => 'Mon-Fri: 9:00 AM - 6:00 PM',
                                    'image' => 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=1200',
                                    'features' => ['Dermatology', 'Orthopedics', 'Physical Therapy'],
                                    'tech_specs' => ['Open MRI', '3D Mammography', 'Hydrotherapy Pool'],
                                    'is_primary' => false
                                ]
                            ]
                        ]
                    ],
                    [
                        'type' => 'infrastructure_highlights',
                        'data' => [
                            'title' => 'Infrastructure Highlights',
                            'highlights' => [
                                [
                                    'title' => 'Advanced Diagnostic Imaging',
                                    'description' => 'Our clinics are equipped with the latest 3 Tesla MRI machines and 128-slice CT scanners, providing high-resolution imaging for accurate and early diagnosis. We prioritize low-radiation protocols for patient safety.',
                                    'image' => 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1600',
                                    'reverse' => false,
                                    'badge' => 'ISO Certified Imaging',
                                    'features' => ['International Safety Standards', 'High-Resolution 3T MRI']
                                ],
                                [
                                    'title' => 'Modular Operation Theatres',
                                    'description' => 'Our modular operation theatres utilize HEPA filtration systems to maintain ISO Class 5 sterility. Equipped with robotic surgical assistants and integrated monitoring systems, we ensure precision in every procedure.',
                                    'image' => 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=1600',
                                    'reverse' => true,
                                    'badge' => 'Class 5 Sterility',
                                    'features' => ['HEPA Filtration Systems', 'Robotic Surgical Assistants']
                                ],
                                [
                                    'title' => 'Smart ICU & Recovery Suites',
                                    'description' => 'Patient recovery is our priority. Our Smart ICUs feature continuous multi-parameter monitoring connected to a central command center. Private recovery suites are designed with ergonomics and calmness in mind.',
                                    'image' => 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=1600',
                                    'reverse' => false,
                                    'badge' => '24/7 Monitoring',
                                    'features' => ['Multi-parameter Monitoring', 'Ergonomic Recovery Suites']
                                ]
                            ]
                        ]
                    ],
                    [
                        'type' => 'cta_section',
                        'data' => [
                            'title' => 'Ready to visit?',
                            'description' => 'Call our care coordinator to schedule your appointment at the nearest location.',
                            'button_text' => 'Call Dispatch',
                            'button_link' => 'tel:+977123456789'
                        ]
                    ],
                ],
            ],
            [
                'title' => 'Pharmacy',
                'slug' => 'pharmacy',
                'seo_title' => 'Pharmacy - Easy Healthcare 101',
                'seo_description' => 'Order medicines online and get them delivered to your doorstep.',
                'hero_image' => 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1920&q=80',
                'content' => [
                    [
                        'type' => 'hero_section',
                        'data' => [
                            'title' => 'Online Pharmacy',
                            'subtitle' => 'Genuine medicines delivered to your doorstep. Upload your prescription and we handle the rest.',
                            'image' => 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1920&q=80',
                        ],
                    ],
                    [
                        'type' => 'features_list',
                        'data' => [
                            'title' => 'A better way to get your healthcare',
                            'subtitle' => 'Why Choose Us',
                            'features' => [
                                [
                                    'title' => 'Pharmacist Verified',
                                    'description' => 'Every order is reviewed by a licensed pharmacist for safety and interactions.',
                                    'icon' => 'stethoscope'
                                ],
                                [
                                    'title' => 'Fast Delivery',
                                    'description' => 'Quick home delivery within Kathmandu Valley and express options for nearby districts.',
                                    'icon' => 'truck'
                                ],
                                [
                                    'title' => 'EasyCare 365',
                                    'description' => 'Automated refills for chronic conditions so you never run out of medicine.',
                                    'icon' => 'pill'
                                ]
                            ]
                        ]
                    ],
                    [
                        'type' => 'upload_section',
                        'data' => [
                            'title' => 'Upload Prescription',
                            'description' => 'Upload a clear photo of your doctor\'s prescription. Our pharmacists will verify and process your order.',
                            'labels' => [
                                'remove' => 'Remove',
                                'selectFile' => 'Select a file',
                                'supported' => 'Supported: JPG, PNG, PDF',
                                'name' => 'Full Name',
                                'phone' => 'Phone Number',
                                'address' => 'Address',
                                'email' => 'Email (optional)',
                                'next' => 'Next',
                                'submit' => 'Submit Prescription',
                                'uploading' => 'Uploading...'
                            ],
                            'placeholders' => [
                                'name' => 'Enter your name',
                                'phone' => 'e.g. +9779812345678',
                                'address' => 'Street, City, District',
                                'email' => 'you@example.com'
                            ],
                            'messages' => [
                                'success' => 'Prescription uploaded successfully! We will contact you shortly.',
                                'steps' => [
                                    'step1' => 'Upload clear image',
                                    'step2' => 'Pharmacist verifies',
                                    'step3' => 'Delivery to Doorstep'
                                ]
                            ]
                        ]
                    ],
                    [
                        'type' => 'coming_soon_section',
                        'data' => [
                            'title' => 'Online Pharmacy Store Coming Soon',
                            'description' => 'We are building a comprehensive digital pharmacy experience. Soon you will be able to browse thousands of OTC medicines, wellness products, and medical devices directly from our app.',
                            'features' => [
                                [
                                    'title' => 'Complete Range',
                                    'description' => 'Access to a full inventory of prescription and OTC medications.',
                                    'icon' => 'pill'
                                ],
                                [
                                    'title' => '100% Authentic',
                                    'description' => 'Directly sourced from authorized distributors with quality assurance.',
                                    'icon' => 'shield-check'
                                ],
                                [
                                    'title' => 'Express Delivery',
                                    'description' => 'Fast doorstep delivery with real-time tracking integration.',
                                    'icon' => 'truck'
                                ]
                            ]
                        ]
                    ]
                ],
            ],
            [
                'title' => 'Community Health',
                'slug' => 'community-health',
                'seo_title' => 'Community Health - Easy Healthcare 101',
                'seo_description' => 'Join our initiatives to promote wellness, education, and accessible healthcare.',
                'hero_image' => 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=80',
                'content' => [
                    [
                        'type' => 'hero_section',
                        'data' => [
                            'title' => 'Building a Healthier Community Together',
                            'subtitle' => 'Join our initiatives to promote wellness, education, and accessible healthcare for everyone.',
                            'image' => 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=80',
                        ],
                    ],
                    [
                        'type' => 'programs_section',
                        'data' => [
                            'title' => 'Our Community Programs',
                            'subtitle' => 'Impactful initiatives driving real change.',
                            'items' => [
                                [
                                    'title' => 'Health Education',
                                    'description' => 'Workshops on nutrition, hygiene, and disease prevention.',
                                    'icon' => 'BookOpen',
                                    'stats' => '50+ Workshops'
                                ],
                                [
                                    'title' => 'Free Screenings',
                                    'description' => 'Regular health camps for blood pressure, diabetes, and vision.',
                                    'icon' => 'Stethoscope',
                                    'stats' => '10k+ Screened'
                                ],
                                [
                                    'title' => 'Senior Care',
                                    'description' => 'Support groups and home visits for elderly community members.',
                                    'icon' => 'Heart',
                                    'stats' => '500+ Seniors'
                                ]
                            ]
                        ]
                    ],
                    [
                        'type' => 'events_section',
                        'data' => [
                            'title' => 'Upcoming Events',
                            'subtitle' => 'Get involved in our next community activities.',
                            'items' => [
                                [
                                    'id' => 1,
                                    'title' => 'Community Health Fair',
                                    'date' => 'Oct 15, 2023',
                                    'time' => '10:00 AM',
                                    'location' => 'City Park',
                                    'description' => 'Join us for free health screenings, expert talks, and wellness activities for the whole family.',
                                    'type' => 'Public',
                                    'spots_left' => 'Unlimited'
                                ],
                                [
                                    'id' => 2,
                                    'title' => 'Blood Donation Drive',
                                    'date' => 'Oct 22, 2023',
                                    'time' => '09:00 AM',
                                    'location' => 'Main Clinic',
                                    'description' => 'Help save lives by donating blood. Refreshments provided for all donors.',
                                    'type' => 'Volunteer',
                                    'spots_left' => '20 spots'
                                ]
                            ]
                        ]
                    ],
                    [
                        'type' => 'volunteer_section',
                        'data' => [
                            'title' => 'Volunteer With Us',
                            'description' => 'Make a difference in your community.',
                            'labels' => [
                                'name' => 'Full Name',
                                'phone' => 'Phone Number',
                                'email' => 'Email Address',
                                'submit' => 'Submit'
                            ],
                            'placeholders' => [
                                'name' => 'Jane Doe',
                                'phone' => '(555) 000-0000',
                                'email' => 'jane@example.com'
                            ]
                        ]
                    ]
                ],
            ],
            [
                'title' => 'Membership',
                'slug' => 'membership',
                'seo_title' => 'Membership - Easy Healthcare 101',
                'seo_description' => 'Join our membership plans for exclusive healthcare benefits.',
                'hero_image' => 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=80',
                'content' => [
                    [
                        'type' => 'hero_section',
                        'data' => [
                            'title' => 'Healthcare That Revolves Around You',
                            'description' => 'Join our membership plans for priority access, home visits, and comprehensive care coordination.',
                            'image' => 'https://images.unsplash.com/photo-1576091160550-21733e99db29?auto=format&fit=crop&w=800&q=80',
                        ],
                    ],
                    [
                        'type' => 'features_section',
                        'data' => [
                            'title' => 'Core Components',
                            'subtitle' => 'What makes our membership unique',
                            'items' => [
                                [
                                    'title' => 'Preventive & Primary Care',
                                    'description' => 'A structured care plan designed to monitor overall health.',
                                    'icon' => 'Stethoscope',
                                    'details' => [
                                        'Comprehensive health check-up at partner clinics',
                                        'Follow-up visits with lab tests',
                                        'Digital health records maintained & shared'
                                    ]
                                ],
                                [
                                    'title' => 'Medical Logistics Support',
                                    'description' => 'End-to-end support for all medical visits and coordination.',
                                    'icon' => 'UserCheck',
                                    'details' => [
                                        'Dedicated Care Coordinator',
                                        'Appointment booking with specialists',
                                        'Non-Emergency Medical Transport (NEMT)',
                                        'Medication refill & lab sample collection'
                                    ]
                                ],
                                [
                                    'title' => 'Home Health Visits',
                                    'description' => 'Regular wellness monitoring right at home.',
                                    'icon' => 'Home',
                                    'details' => [
                                        'Nurse visits for vitals & screening',
                                        'Medication reviews',
                                        'Optional physiotherapy & wound care'
                                    ]
                                ],
                                [
                                    'title' => 'Digital Connectivity',
                                    'description' => 'Real-time updates and communication platform.',
                                    'icon' => 'Smartphone',
                                    'details' => [
                                        'Online dashboard & mobile app',
                                    ]
                                ]
                            ]
                        ]
                    ],
                    [
                        'type' => 'value_prop_section',
                        'data' => [
                            'title' => 'Why Choose Our Membership?',
                            'subtitle' => 'Designed for your peace of mind',
                            'items' => [
                                [
                                    'title' => 'Peace of Mind',
                                    'icon' => 'Heart',
                                    'points' => ['24/7 Support', 'Emergency coordination']
                                ],
                                [
                                    'title' => 'Convenience',
                                    'icon' => 'PhoneCall',
                                    'points' => ['Home visits', 'Medicine delivery']
                                ],
                                [
                                    'title' => 'Global Standards',
                                    'icon' => 'Globe',
                                    'points' => ['Certified professionals', 'International protocols']
                                ]
                            ]
                        ]
                    ],
                    [
                        'type' => 'pricing_section',
                        'data' => [
                            'title' => 'Simple, Transparent Pricing',
                            'subtitle' => 'Choose the plan that fits your needs',
                            'description' => 'All plans include our core care coordination services.',
                            'customPackageTitle' => 'Need a Custom Plan?',
                            'customPackageDescription' => 'We can tailor a package to your specific requirements.',
                            'customPackageButtonText' => 'Contact Us',
                            'plans' => [
                                [
                                    'id' => 'basic',
                                    'name' => 'EasyCare 365 Basic',
                                    'price' => 365,
                                    'period' => '/year',
                                    'description' => 'Essential care coordination for peace of mind.',
                                    'buttonText' => 'Select Basic',
                                    'features' => [
                                        ['text' => 'Annual comprehensive health check-up', 'included' => true],
                                        ['text' => '4 Home health visits per year', 'included' => true],
                                        ['text' => '2 Non-Emergency Transport (NEMT) trips', 'included' => true],
                                        ['text' => 'Dedicated Care Coordinator', 'included' => true],
                                        ['text' => 'Digital health records dashboard', 'included' => true],
                                        ['text' => 'Medication refill management', 'included' => true],
                                        ['text' => 'Monthly Nurse Visits', 'included' => false],
                                        ['text' => 'Chronic disease monitoring', 'included' => false],
                                    ],
                                ],
                                [
                                    'id' => 'plus',
                                    'name' => 'EasyCare 365 Plus',
                                    'price' => 499,
                                    'period' => '/year',
                                    'description' => 'Enhanced coverage with more visits and tele-health.',
                                    'highlight' => true,
                                    'buttonText' => 'Select Plus',
                                    'features' => [
                                        ['text' => 'Annual comprehensive health check-up', 'included' => true],
                                        ['text' => '6 Home health visits per year', 'included' => true],
                                        ['text' => '4 Non-Emergency Transport (NEMT) trips', 'included' => true],
                                        ['text' => 'Dedicated Care Coordinator', 'included' => true],
                                        ['text' => 'Digital health records dashboard', 'included' => true],
                                        ['text' => 'Medication refill management', 'included' => true],
                                        ['text' => 'Teleconsultation credits', 'included' => true],
                                        ['text' => 'Chronic disease monitoring', 'included' => false],
                                    ],
                                ],
                                [
                                    'id' => 'premium',
                                    'name' => 'EasyCare 365 Premium',
                                    'price' => 699,
                                    'period' => '/year',
                                    'description' => 'Complete healthcare management and regular monitoring.',
                                    'buttonText' => 'Select Premium',
                                    'features' => [
                                        ['text' => 'Annual comprehensive health check-up', 'included' => true],
                                        ['text' => 'Monthly nurse visits (12/year)', 'included' => true],
                                        ['text' => '4 Non-Emergency Transport (NEMT) trips', 'included' => true],
                                        ['text' => 'Dedicated Care Manager', 'included' => true],
                                        ['text' => 'Digital health records dashboard', 'included' => true],
                                        ['text' => 'Pharmacy refill service included', 'included' => true],
                                        ['text' => 'Teleconsultation credits', 'included' => true],
                                        ['text' => 'Active chronic disease monitoring', 'included' => true],
                                    ],
                                ],
                            ]
                        ]
                    ]
                ],
            ],
        ];

        foreach ($pages as $page) {
            Page::updateOrCreate(
                ['slug' => $page['slug']],
                $page
            );
        }
    }
}
