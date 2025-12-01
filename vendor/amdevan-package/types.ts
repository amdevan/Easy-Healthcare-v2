export interface HealthPackage {
  id: number;
  title: string;
  target: string;
  purpose: string;
  includes: string[];
  optional?: string[];
  addOn?: string;
  iconName: 'activity' | 'briefcase' | 'heart' | 'user' | 'clock' | 'users' | 'baby' | 'shield' | 'smile' | 'smartphone';
  priceEstimate?: string; // Mock data for UI
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum ViewState {
  GRID = 'GRID',
  DETAILS = 'DETAILS'
}