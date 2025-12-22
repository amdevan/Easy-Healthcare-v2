export interface HealthPackage {
  id: string;
  name: string;
  price: number;
  priceUsd?: number;
  description: string;
  features: string[];
  is_popular?: boolean;
  category?: string;
}

export interface ProductPageData {
  hero: {
    title: string;
    description: string;
  };
  basics: {
    services: string[] | { title: string }[];
  };
  cta: {
    title: string;
    description: string;
    primaryButtonText: string;
    primaryButtonUrl: string;
    secondaryButtonText: string;
    secondaryButtonUrl: string;
  };
  packages: HealthPackage[];
}
