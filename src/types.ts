export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  description: string;
  specs: {
    display: string;
    processor: string;
    ram: string;
    storage: string;
    camera: string;
    battery: string;
  };
  colors: string[];
  storageOptions: string[];
  isNew?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
