import React from 'react';
import { PricingPlan, CoreComponent, ValueProp } from './types';
import { Heart, Stethoscope, Home, Smartphone, PhoneCall, Globe, UserCheck } from 'lucide-react';

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'basic',
    name: 'EasyCare 365 Basic',
    price: 365,
    period: '/year',
    description: 'Essential care coordination for peace of mind.',
    buttonText: 'Select Basic',
    features: [
      { text: 'Annual comprehensive health check-up', included: true },
      { text: '4 Home health visits per year', included: true },
      { text: '2 Non-Emergency Transport (NEMT) trips', included: true },
      { text: 'Dedicated Care Coordinator', included: true },
      { text: 'Digital health records dashboard', included: true },
      { text: 'Medication refill management', included: true },
      { text: 'Monthly Nurse Visits', included: false },
      { text: 'Chronic disease monitoring', included: false },
    ],
  },
  {
    id: 'plus',
    name: 'EasyCare 365 Plus',
    price: 499,
    period: '/year',
    description: 'Enhanced coverage with more visits and tele-health.',
    highlight: true,
    buttonText: 'Select Plus',
    features: [
      { text: 'Annual comprehensive health check-up', included: true },
      { text: '6 Home health visits per year', included: true },
      { text: '4 Non-Emergency Transport (NEMT) trips', included: true },
      { text: 'Dedicated Care Coordinator', included: true },
      { text: 'Digital health records dashboard', included: true },
      { text: 'Medication refill management', included: true },
      { text: 'Teleconsultation credits', included: true },
      { text: 'Chronic disease monitoring', included: false },
    ],
  },
  {
    id: 'premium',
    name: 'EasyCare 365 Premium',
    price: 699,
    period: '/year',
    description: 'Complete healthcare management and regular monitoring.',
    buttonText: 'Select Premium',
    features: [
      { text: 'Annual comprehensive health check-up', included: true },
      { text: 'Monthly nurse visits (12/year)', included: true },
      { text: '4 Non-Emergency Transport (NEMT) trips', included: true },
      { text: 'Dedicated Care Manager', included: true },
      { text: 'Digital health records dashboard', included: true },
      { text: 'Pharmacy refill service included', included: true },
      { text: 'Teleconsultation credits', included: true },
      { text: 'Active chronic disease monitoring', included: true },
    ],
  },
];

export const CORE_COMPONENTS: CoreComponent[] = [
  {
    title: 'Preventive & Primary Care',
    description: 'A structured care plan designed to monitor overall health.',
    icon: <Stethoscope className="w-6 h-6" />,
    details: [
      'Comprehensive health check-up at partner clinics',
      'Follow-up visits with lab tests',
      'Digital health records maintained & shared'
    ]
  },
  {
    title: 'Medical Logistics Support',
    description: 'End-to-end support for all medical visits and coordination.',
    icon: <UserCheck className="w-6 h-6" />,
    details: [
      'Dedicated Care Coordinator',
      'Appointment booking with specialists',
      'Non-Emergency Medical Transport (NEMT)',
      'Medication refill & lab sample collection'
    ]
  },
  {
    title: 'Home Health Visits',
    description: 'Regular wellness monitoring right at home.',
    icon: <Home className="w-6 h-6" />,
    details: [
      'Nurse visits for vitals & screening',
      'Medication reviews',
      'Optional physiotherapy & wound care'
    ]
  },
  {
    title: 'Digital Connectivity',
    description: 'Real-time updates and communication platform.',
    icon: <Smartphone className="w-6 h-6" />,
    details: [
      'Online dashboard & mobile app',
      'Chat/Call access to Coordinator',
      'Easy appointment scheduling'
    ]
  },
  {
    title: '24/7 Support Line',
    description: 'Round-the-clock assistance when it matters most.',
    icon: <PhoneCall className="w-6 h-6" />,
    details: [
      'Helpline & WhatsApp for urgent coordination',
      'Immediate NEMT dispatch',
      'Priority support for emergencies'
    ]
  },
];

export const VALUE_PROPS: ValueProp[] = [
  {
    title: 'For the Nepali Diaspora',
    icon: <Globe className="w-10 h-10" />,
    points: [
      'Peace of mind with supervised care',
      'Transparent updates on vitals & reports',
      'Trusted healthcare network across Nepal',
      'Comprehensive support for just $1/day'
    ]
  },
  {
    title: 'For Parents in Nepal',
    icon: <Heart className="w-10 h-10" />,
    points: [
      'Regular monitoring and early intervention',
      'Comfortable home-based care services',
      'Easy access to hospitals',
      'Compassionate, personalized experience'
    ]
  }
];