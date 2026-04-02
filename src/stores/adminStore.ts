import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  product: Product;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  deliveryStatus: 'pending' | 'shipped' | 'delivered';
  orderDate: Date;
  shippingAddress: string;
  createdAt?: Date;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  joinDate: Date;
  lastOrder: Date;
  status: 'active' | 'inactive' | 'new';
}

export interface Discount {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  expiryDate: Date;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
}

export interface AdminStore {
  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;

  // Customers
  customers: Customer[];
  addCustomer: (customer: Customer) => void;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;

  // Discounts
  discounts: Discount[];
  addDiscount: (discount: Discount) => void;
  updateDiscount: (id: string, updates: Partial<Discount>) => void;
  deleteDiscount: (id: string) => void;

  // Analytics
  getTotalRevenue: () => number;
  getTotalOrders: () => number;
  getTotalCustomers: () => number;
  getSalesData: () => { month: string; sales: number }[];
  getOrdersByCategory: () => { category: string; orders: number }[];
  getTrafficSources: () => { source: string; value: number }[];
  getRevenueByMonth: () => { month: string; revenue: number }[];
  getCustomerAcquisitionData: () => { month: string; customers: number }[];
}

// Sample data
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Galaxy S24 Ultra',
    brand: 'Samsung',
    price: 176000,
    image: 'https://images.unsplash.com/photo-1705585172952-6e7b0e54796a',
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
  }
];

const sampleOrders: Order[] = [
  {
    id: 'ORD001',
    customerId: 'CUST001',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    product: sampleProducts[0],
    quantity: 1,
    totalPrice: 176000,
    status: 'delivered',
    paymentStatus: 'paid',
    deliveryStatus: 'delivered',
    orderDate: new Date('2024-01-15'),
    shippingAddress: '123 Main St, Nairobi, Kenya',
    createdAt: new Date('2024-01-15')
  },
  {
    id: 'ORD002',
    customerId: 'CUST002',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    product: sampleProducts[1],
    quantity: 2,
    totalPrice: 110000,
    status: 'shipped',
    paymentStatus: 'paid',
    deliveryStatus: 'shipped',
    orderDate: new Date('2024-01-20'),
    shippingAddress: '456 Oak Ave, Nairobi, Kenya',
    createdAt: new Date('2024-01-20')
  },
  {
    id: 'ORD003',
    customerId: 'CUST003',
    customerName: 'Bob Johnson',
    customerEmail: 'bob@example.com',
    product: sampleProducts[2],
    quantity: 1,
    totalPrice: 35000,
    status: 'processing',
    paymentStatus: 'paid',
    deliveryStatus: 'pending',
    orderDate: new Date('2024-01-25'),
    shippingAddress: '789 Pine St, Nairobi, Kenya',
    createdAt: new Date('2024-01-25')
  }
];

const sampleCustomers: Customer[] = [
  {
    id: 'CUST001',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+254 700 123 456',
    orders: 3,
    totalSpent: 221000,
    joinDate: new Date('2023-06-15'),
    lastOrder: new Date('2024-01-15'),
    status: 'active'
  },
  {
    id: 'CUST002',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+254 711 234 567',
    orders: 2,
    totalSpent: 90500,
    joinDate: new Date('2023-08-20'),
    lastOrder: new Date('2024-01-20'),
    status: 'active'
  },
  {
    id: 'CUST003',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '+254 722 345 678',
    orders: 1,
    totalSpent: 35000,
    joinDate: new Date('2024-01-10'),
    lastOrder: new Date('2024-01-25'),
    status: 'new'
  }
];

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      // Products
      products: sampleProducts,
      addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),
      updateProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),

      // Orders
      orders: sampleOrders,
      addOrder: (order) =>
        set((state) => ({ orders: [...state.orders, order] })),
      updateOrder: (id, updates) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === id ? { ...o, ...updates } : o
          ),
        })),

      // Customers
      customers: sampleCustomers,
      addCustomer: (customer) =>
        set((state) => ({ customers: [...state.customers, customer] })),
      updateCustomer: (id, updates) =>
        set((state) => ({
          customers: state.customers.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        })),

      // Discounts
      discounts: [],
      addDiscount: (discount) =>
        set((state) => ({ discounts: [...state.discounts, discount] })),
      updateDiscount: (id, updates) =>
        set((state) => ({
          discounts: state.discounts.map((d) =>
            d.id === id ? { ...d, ...updates } : d
          ),
        })),
      deleteDiscount: (id) =>
        set((state) => ({
          discounts: state.discounts.filter((d) => d.id !== id),
        })),

      // Analytics
      getTotalRevenue: () => {
        const { orders } = get();
        return orders
          .filter((o) => o.paymentStatus === 'paid')
          .reduce((sum, o) => sum + o.totalPrice, 0);
      },
      getTotalOrders: () => get().orders.length,
      getTotalCustomers: () => get().customers.length,
      getSalesData: () => {
        const { orders } = get();
        const monthlySales = orders.reduce((acc, order) => {
          const month = order.orderDate.toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
          });
          acc[month] = (acc[month] || 0) + order.totalPrice;
          return acc;
        }, {} as Record<string, number>);

        return Object.entries(monthlySales).map(([month, sales]) => ({
          month,
          sales,
        }));
      },
      getOrdersByCategory: () => {
        const { orders } = get();
        const categoryOrders = orders.reduce((acc, order) => {
          const category = order.product.category;
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        return Object.entries(categoryOrders).map(([category, orders]) => ({
          category,
          orders,
        }));
      },
      getTrafficSources: () => [
        { source: 'Direct', value: 35 },
        { source: 'Social Media', value: 25 },
        { source: 'Search Engines', value: 20 },
        { source: 'Email', value: 15 },
        { source: 'Referrals', value: 5 },
      ],
      getRevenueByMonth: () => {
        const { orders } = get();
        const monthlyRevenue = orders
          .filter((o) => o.paymentStatus === 'paid')
          .reduce((acc, order) => {
            const month = order.orderDate.toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            });
            acc[month] = (acc[month] || 0) + order.totalPrice;
            return acc;
          }, {} as Record<string, number>);

        return Object.entries(monthlyRevenue).map(([month, revenue]) => ({
          month,
          revenue,
        }));
      },
      getCustomerAcquisitionData: () => {
        const { customers } = get();
        const monthlyCustomers = customers.reduce((acc, customer) => {
          const month = customer.joinDate.toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
          });
          acc[month] = (acc[month] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        return Object.entries(monthlyCustomers).map(([month, customers]) => ({
          month,
          customers,
        }));
      },
    }),
    {
      name: 'admin-store',
    }
  )
);