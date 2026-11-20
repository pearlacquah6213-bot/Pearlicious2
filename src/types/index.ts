export type Role = 'SUPER_ADMIN' | 'STAFF' | 'CUSTOMER';

export type ProductCategory = 
  | 'Arabic Perfumes'
  | 'Luxury Perfumes'
  | 'Perfume Oils'
  | 'Body Sprays'
  | "Men's Perfumes"
  | "Women's Perfumes"
  | 'Unisex Perfumes';

export interface ProductSizeOption {
  size: string; // e.g. '30ml', '50ml', '75ml', '100ml'
  price: number; // in GHS (GH₵)
  costPrice: number; // in GHS for profit calc
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number; // base price in GHS
  costPrice: number; // base cost price in GHS
  discountPrice?: number;
  sizes: ProductSizeOption[];
  description: string;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  fragranceFamily: string; // e.g. 'Woody & Amber', 'Floral & Sweet', 'Oud & Leather', 'Fresh & Aquatic'
  images: string[];
  stock: number; // total stock across sizes
  isFeatured: boolean;
  isBestSeller: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface CartItem {
  id: string; // unique cart line id (productId + size)
  productId: string;
  product: Product;
  selectedSize: string;
  price: number;
  quantity: number;
}

export type OrderStatus = 
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled'
  | 'Refunded';

export type PaymentMethod = 
  | 'MTN Mobile Money'
  | 'Telecel Cash'
  | 'AT Money'
  | 'Visa / Mastercard';

export interface Order {
  id: string;
  orderNumber: string;
  customerId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  region: string; // 16 regions of Ghana
  city: string;
  address: string;
  deliveryInstructions?: string;
  items: {
    productId: string;
    productName: string;
    selectedSize: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Pending' | 'Success' | 'Failed';
  paymentReference?: string;
  deliveryPersonnel?: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  region: string;
  ordersCount: number;
  totalSpent: number;
  loyaltyPoints: number;
  createdAt: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  suppliedBrands: string[];
  activeProductsCount: number;
}

export interface InventoryLog {
  id: string;
  productId: string;
  productName: string;
  type: 'Restock' | 'Sale' | 'Adjustment' | 'Damage';
  quantityChange: number;
  previousStock: number;
  newStock: number;
  date: string;
  performedBy: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  minSpend: number;
  expiryDate: string;
  isActive: boolean;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number; // 1-5
  comment: string;
  date: string;
}

export const GHANA_REGIONS = [
  'Greater Accra Region',
  'Ashanti Region',
  'Central Region',
  'Western Region',
  'Eastern Region',
  'Volta Region',
  'Northern Region',
  'Upper East Region',
  'Upper West Region',
  'Bono Region',
  'Bono East Region',
  'Ahafo Region',
  'Oti Region',
  'Savannah Region',
  'North East Region',
  'Western North Region'
];
