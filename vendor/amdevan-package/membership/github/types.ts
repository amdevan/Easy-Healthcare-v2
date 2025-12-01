import type { ReactNode } from 'react';
export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: PlanFeature[];
  highlight?: boolean;
  buttonText: string;
}

export interface CoreComponent {
  title: string;
  description: string;
  details: string[];
  icon: ReactNode;
}

export interface ValueProp {
  title: string;
  points: string[];
  icon: ReactNode;
}