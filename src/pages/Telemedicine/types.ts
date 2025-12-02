import type { ReactNode } from 'react';

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export interface StepProps {
  number: number;
  title: string;
  description: string;
}
