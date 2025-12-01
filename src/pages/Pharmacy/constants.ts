import { Product, ProductCategory } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Amoxicillin 500mg',
    category: ProductCategory.PRESCRIPTION,
    price: 350,
    image: 'https://picsum.photos/300/300?random=1',
    description: 'Antibiotic used to treat bacterial infections. Requires prescription.',
    requiresPrescription: true,
  },
  {
    id: '2',
    name: 'Metformin 500mg',
    category: ProductCategory.PRESCRIPTION,
    price: 120,
    image: 'https://picsum.photos/300/300?random=2',
    description: 'First-line medication for the treatment of type 2 diabetes.',
    requiresPrescription: true,
  },
  {
    id: '3',
    name: 'Paracetamol 500mg',
    category: ProductCategory.OTC,
    price: 50,
    image: 'https://picsum.photos/300/300?random=3',
    description: 'Effective pain reliever and fever reducer.',
    requiresPrescription: false,
  },
  {
    id: '4',
    name: 'Vitamin C Complex',
    category: ProductCategory.WELLNESS,
    price: 450,
    image: 'https://picsum.photos/300/300?random=4',
    description: 'Immune booster supplement with zinc.',
    requiresPrescription: false,
  },
  {
    id: '5',
    name: 'Digital BP Monitor',
    category: ProductCategory.DEVICES,
    price: 2500,
    image: 'https://picsum.photos/300/300?random=5',
    description: 'Automatic upper arm blood pressure monitor.',
    requiresPrescription: false,
  },
  {
    id: '6',
    name: 'Baby Formula Stage 1',
    category: ProductCategory.MOTHER_BABY,
    price: 1800,
    image: 'https://picsum.photos/300/300?random=6',
    description: 'Nutritional formula for infants 0-6 months.',
    requiresPrescription: false,
  },
  {
    id: '7',
    name: 'N95 Face Masks (Pack of 5)',
    category: ProductCategory.DEVICES,
    price: 300,
    image: 'https://picsum.photos/300/300?random=7',
    description: 'High-filtration masks for respiratory protection.',
    requiresPrescription: false,
  },
  {
    id: '8',
    name: 'Cough Syrup (Herbal)',
    category: ProductCategory.OTC,
    price: 180,
    image: 'https://picsum.photos/300/300?random=8',
    description: 'Soothing relief for dry and wet coughs.',
    requiresPrescription: false,
  }
];

export const APP_NAME = 'Easy Health Care';
export const CURRENCY = 'NPR';