import { LucideIcon } from "lucide-react";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  idealFor: string;
}

export interface VehicleItem {
  id: string;
  name: string;
  description: string;
  features: string[];
  image: string;
}

export interface PricingTier {
  service: string;
  price: string;
  details: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface BookingFormData {
  patientName: string;
  contactNumber: string;
  pickupLocation: string;
  dropoffLocation: string;
  date: string;
  time: string;
  vehicleType: string;
  notes: string;
}