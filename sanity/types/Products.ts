// types/Product.ts

export interface ProductColour {
  name: string;
  swatch?: {
    asset?: { _ref: string };  
  };
}

export interface Product {
  _id?: string;
  name: string;
  slug?: { current: string };
  images?: {
    asset?: { _ref: string };
  };
  description?: unknown;             
  price: number;
  categories?: { _ref: string }[];    
  stock?: number;
  category: '1-8-model-car-kits';
}