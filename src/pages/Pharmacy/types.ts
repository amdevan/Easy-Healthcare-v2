export enum ProductCategory {
  PRESCRIPTION = 'Prescription Medicines',
  OTC = 'OTC Products',
  WELLNESS = 'Wellness & Nutrition',
  MOTHER_BABY = 'Mother & Baby Care',
  DEVICES = 'Medical Devices',
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  image: string;
  description: string;
  requiresPrescription: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export type ViewState = 'HOME' | 'SHOP' | 'UPLOAD' | 'CART_PAGE';