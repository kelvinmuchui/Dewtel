import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'All Categories', icon: '📱' },
  { id: 'smartphones', name: 'Smartphones', icon: '📱' },
  { id: 'accessories', name: 'Accessories', icon: '🎧' },
  { id: 'tablets', name: 'Tablets', icon: '📁' },
  { id: 'special_offers', name: 'Special Offers', icon: '🏷️' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Galaxy S26 Ultra',
    brand: 'Samsung',
    price: 176000,
    image: 'https://www.phoneplacekenya.com/wp-content/uploads/2025/11/Samsung-Galaxy-S26-Ultra-1.webp',
    category: 'smartphones',
    description: 'Samsung flagship smartphone with AI camera and S Pen.',
    specs: {
      display: '6.8-inch Dynamic AMOLED 120Hz',
      processor: 'Snapdragon 8 Gen 3',
      ram: '12GB',
      storage: '256GB,512GB',
      camera: '200MP Quad Camera',
      battery: '5000 mAh'
    },
    colors: ['#000000', '#374151'],
    storageOptions: ['256GB', '512GB'],
    isNew: true
  },

  {
    id: '2',
    name: 'Galaxy A55',
    brand: 'Samsung',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab',
    category: 'smartphones',
    description: 'Midrange Samsung phone with premium design.',
    specs: {
      display: '6.6-inch AMOLED',
      processor: 'Exynos 1480',
      ram: '8GB',
      storage: '128GB,256GB',
      camera: '50MP',
      battery: '5000 mAh'
    },
    colors: ['#000', '#ffffff'],
    storageOptions: ['128GB', '256GB']
  },

  {
    id: '3',
    name: 'Galaxy A25',
    brand: 'Samsung',
    price: 33000,
    image: 'https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd',
    category: 'smartphones',
    description: 'Affordable Samsung 5G smartphone.',
    specs: {
      display: '6.5-inch AMOLED',
      processor: 'Exynos 1280',
      ram: '6GB',
      storage: '128GB',
      camera: '50MP',
      battery: '5000 mAh'
    },
    colors: ['#000', '#2563eb'],
    storageOptions: ['128GB']
  },

  {
    id: '4',
    name: 'iPhone 17 Pro Max',
    brand: 'Apple',
    price: 189999,
    image: 'https://www.phoneplacekenya.com/wp-content/uploads/2025/07/71cdtM6hgmL._UF10001000_QL80_-800x800.jpg',
    category: 'smartphones',
    description: 'Titanium iPhone with A17 Pro chip.',
    specs: {
      display: '6.7-inch Super Retina',
      processor: 'A17 Pro',
      ram: '8GB',
      storage: '256GB,512GB,1TB',
      camera: '48MP Triple Camera',
      battery: '29 hours'
    },
    colors: ['#000', '#e5e5e5'],
    storageOptions: ['256GB', '512GB', '1TB'],
    isNew: true
  },

  {
    id: '5',
    name: 'iPhone 13',
    brand: 'Apple',
    price: 105000,
    image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5',
    category: 'smartphones',
    description: 'Popular Apple phone with A15 chip.',
    specs: {
      display: '6.1-inch OLED',
      processor: 'A15 Bionic',
      ram: '6GB',
      storage: '128GB,256GB',
      camera: '12MP Dual',
      battery: '19 hours'
    },
    colors: ['#000', '#ff0000', '#ffffff'],
    storageOptions: ['128GB', '256GB']
  },

  {
    id: '6',
    name: 'Tecno Camon 30 Pro',
    brand: 'Tecno',
    price: 48999,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97',
    category: 'smartphones',
    description: 'Powerful Tecno camera phone.',
    specs: {
      display: '6.78-inch AMOLED',
      processor: 'Dimensity 8200',
      ram: '12GB',
      storage: '256GB',
      camera: '50MP Sony',
      battery: '5000 mAh'
    },
    colors: ['#000', '#2563eb'],
    storageOptions: ['256GB']
  },

  {
    id: '7',
    name: 'Tecno Spark 20',
    brand: 'Tecno',
    price: 17999,
    image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e',
    category: 'smartphones',
    description: 'Budget smartphone with large battery.',
    specs: {
      display: '6.6-inch IPS',
      processor: 'Helio G85',
      ram: '8GB',
      storage: '128GB',
      camera: '50MP',
      battery: '5000 mAh'
    },
    colors: ['#000', '#f59e0b'],
    storageOptions: ['128GB']
  },

  {
    id: '8',
    name: 'Infinix Zero 30 5G',
    brand: 'Infinix',
    price: 39999,
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505',
    category: 'smartphones',
    description: 'Affordable 5G smartphone.',
    specs: {
      display: '6.78-inch AMOLED',
      processor: 'Dimensity 8020',
      ram: '12GB',
      storage: '256GB',
      camera: '108MP',
      battery: '5000 mAh'
    },
    colors: ['#000', '#9333ea'],
    storageOptions: ['256GB']
  },

  {
    id: '9',
    name: 'Infinix Note 40',
    brand: 'Infinix',
    price: 27999,
    image: 'https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd',
    category: 'smartphones',
    description: 'Popular midrange Infinix phone.',
    specs: {
      display: '6.78-inch AMOLED',
      processor: 'Helio G99',
      ram: '8GB',
      storage: '256GB',
      camera: '108MP',
      battery: '5000 mAh'
    },
    colors: ['#000', '#64748b'],
    storageOptions: ['256GB']
  },

  {
    id: '10',
    name: 'Redmi Note 13 Pro',
    brand: 'Xiaomi',
    price: 42999,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf',
    category: 'smartphones',
    description: 'Xiaomi device with powerful camera.',
    specs: {
      display: '6.67-inch AMOLED',
      processor: 'Snapdragon 7s',
      ram: '12GB',
      storage: '256GB',
      camera: '200MP',
      battery: '5100 mAh'
    },
    colors: ['#000', '#ffffff'],
    storageOptions: ['256GB']
  },

  {
    id: '11',
    name: 'Oppo Reno 11',
    brand: 'Oppo',
    price: 59999,
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179',
    category: 'smartphones',
    description: 'Elegant Oppo phone with portrait camera.',
    specs: {
      display: '6.7-inch OLED',
      processor: 'Dimensity 8200',
      ram: '12GB',
      storage: '256GB',
      camera: '50MP',
      battery: '4800 mAh'
    },
    colors: ['#000', '#06b6d4'],
    storageOptions: ['256GB']
  },

  /* ACCESSORIES */

  {
    id: '30',
    name: 'AirPods Pro 2',
    brand: 'Apple',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434',
    category: 'accessories',
    description: 'Apple wireless earbuds with noise cancellation.',
    specs: {
      display: 'N/A',
      processor: 'H2 Chip',
      ram: 'N/A',
      storage: 'N/A',
      camera: 'N/A',
      battery: '6 hours'
    },
    colors: ['#ffffff'],
    storageOptions: []
  },

  {
    id: '31',
    name: 'Galaxy Buds 2 Pro',
    brand: 'Samsung',
    price: 24999,
    image: 'https://images.unsplash.com/photo-1612444530582-fc66183b16f7',
    category: 'accessories',
    description: 'Samsung wireless earbuds.',
    specs: {
      display: 'N/A',
      processor: 'Samsung Audio Chip',
      ram: 'N/A',
      storage: 'N/A',
      camera: 'N/A',
      battery: '8 hours'
    },
    colors: ['#000', '#9333ea'],
    storageOptions: []
  },

  {
    id: '32',
    name: 'Oraimo FreePods 4',
    brand: 'Oraimo',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1605464315542-bda3e2f4e605',
    category: 'accessories',
    description: 'Affordable wireless earbuds.',
    specs: {
      display: 'N/A',
      processor: 'Bluetooth 5.3',
      ram: 'N/A',
      storage: 'N/A',
      camera: 'N/A',
      battery: '30 hours with case'
    },
    colors: ['#000', '#ffffff'],
    storageOptions: []
  },

  {
    id: '33',
    name: 'Anker 20000mAh Power Bank',
    brand: 'Anker',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1609592806596-4d9a1fdf86b4',
    category: 'accessories',
    description: 'High capacity power bank.',
    specs: {
      display: 'LED Indicator',
      processor: 'PowerIQ',
      ram: 'N/A',
      storage: 'N/A',
      camera: 'N/A',
      battery: '20000 mAh'
    },
    colors: ['#000'],
    storageOptions: []
  },

  {
    id: '34',
    name: 'Baseus 65W Fast Charger',
    brand: 'Baseus',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0',
    category: 'accessories',
    description: 'Ultra fast charger.',
    specs: {
      display: 'N/A',
      processor: 'GaN Technology',
      ram: 'N/A',
      storage: 'N/A',
      camera: 'N/A',
      battery: 'N/A'
    },
    colors: ['#000'],
    storageOptions: []
  },

  {
    id: '35',
    name: 'Spigen Rugged Armor Case',
    brand: 'Spigen',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1603313011101-320f26a4f6c5',
    category: 'accessories',
    description: 'Shockproof phone case.',
    specs: {
      display: 'N/A',
      processor: 'N/A',
      ram: 'N/A',
      storage: 'N/A',
      camera: 'N/A',
      battery: 'N/A'
    },
    colors: ['#000'],
    storageOptions: []
  }

]