import { Ambulance, Activity, UserCheck, HeartPulse, Home, MapPin } from 'lucide-react';
import { ServiceItem, VehicleItem, PricingTier } from './types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'routine',
    title: 'Routine Medical Visits',
    description: 'Scheduled transport for regular doctor visits, check-ups, and consultations.',
    icon: Activity,
    idealFor: 'Outpatient & follow-up patients'
  },
  {
    id: 'discharge',
    title: 'Hospital Discharge',
    description: 'Safe and comfortable transport from hospital to home after surgery or treatment.',
    icon: Home,
    idealFor: 'Post-surgery patients'
  },
  {
    id: 'dialysis',
    title: 'Dialysis & Chemo',
    description: 'Reliable round-trip transport for recurring treatments.',
    icon: HeartPulse,
    idealFor: 'Renal & cancer patients'
  },
  {
    id: 'rehab',
    title: 'Rehab & Physio',
    description: 'Assistance for repeated rehabilitation sessions with mobility support.',
    icon: UserCheck,
    idealFor: 'Stroke & ortho cases'
  },
  {
    id: 'transfer',
    title: 'Home-to-Hospital',
    description: 'Non-emergency assistance for elderly or bedridden patients requiring transfer.',
    icon: Ambulance,
    idealFor: 'Elderly or bedridden'
  },
  {
    id: 'long-distance',
    title: 'Long-Distance Trips',
    description: 'Intercity supervised transport for rural-to-urban transfers.',
    icon: MapPin,
    idealFor: 'Rural-to-Kathmandu transfers'
  }
];

export const VEHICLES: VehicleItem[] = [
  {
    id: 'basic',
    name: 'Basic NEMT Van',
    description: 'Comfortable transport for ambulatory patients who need supervision.',
    features: ['Comfortable Seating', 'Climate Control', 'GPS Tracking'],
    image: 'https://picsum.photos/600/400?random=1'
  },
  {
    id: 'wheelchair',
    name: 'Wheelchair-Accessible Van',
    description: 'Equipped with hydraulic lifts or ramps and safety harnesses.',
    features: ['Hydraulic Lift/Ramp', 'Safety Harness', 'Attendant Seat'],
    image: 'https://picsum.photos/600/400?random=2'
  },
  {
    id: 'stretcher',
    name: 'Stretcher / BLS Van',
    description: 'For patients unable to sit upright, requiring stretcher transport.',
    features: ['Medical Stretcher', 'Oxygen Support', 'BLS Trained Staff'],
    image: 'https://picsum.photos/600/400?random=3'
  }
];

export const PRICING: PricingTier[] = [
  { service: 'Standard NEMT Trip', price: 'NPR 1,000–1,500', details: 'Within 10 km' },
  { service: 'Wheelchair Van', price: 'NPR 1,500–2,000', details: 'Includes attendant' },
  { service: 'Stretcher / Nurse Escort', price: 'NPR 2,500–4,000', details: 'Distance-based' },
  { service: 'Round Trip (Same Day)', price: '20% Discount', details: 'For Dialysis/Therapy' },
];

export const SYSTEM_INSTRUCTION = `
You are the intelligent assistant for Easy Health Care's Non-Emergency Medical Transportation (NEMT) service in Nepal.
Your goal is to assist users in understanding services, choosing the right vehicle, and estimating costs.

Company Info:
- Mission: Safe, Reliable, and Compassionate Transportation for Every Patient.
- Services: Routine visits, Hospital Discharge, Dialysis/Chemo, Rehab, Home-to-Hospital, Long-distance (Intercity).
- Fleet: Basic Vans (Ambulatory), Wheelchair Vans (Ramps), Stretcher Vans (Bedridden), Medical Escort Vehicles.
- Staff: BLS trained drivers, paramedics, nurses.
- Pricing (Kathmandu Valley):
  - Standard NEMT: NPR 1,000-1,500 (10km).
  - Wheelchair Van: NPR 1,500-2,000.
  - Stretcher/Nurse: NPR 2,500-4,000.
  - Round Trip: 20% discount.

Guidelines:
- Be polite, professional, and empathetic.
- Emphasize safety and reliability.
- If a user asks for emergency service (ambulance for life-threatening issues), clarify that this is NON-emergency and they should call an emergency ambulance (102 in Nepal) immediately if it is critical.
- Keep answers concise and helpful.
- Format responses cleanly.
`;