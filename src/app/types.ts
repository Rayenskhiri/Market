export type Language = 'fr' | 'ar' | 'ar-tn';

export type ProductStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'disabled';
export type ProducerStatus = 'invited' | 'pending' | 'active' | 'rejected' | 'disabled';

export interface Product {
  id: string;
  name: { fr: string; ar: string; 'ar-tn': string };
  description: { fr: string; ar: string; 'ar-tn': string };
  images: string[];
  category: string;
  productionCost: number;
  transportCost: number;
  platformFee: number;
  totalPrice: number;
  unit: { fr: string; ar: string; 'ar-tn': string };
  producerId: string;
  producer: Producer;
  freshness: 'fresh' | 'very-fresh' | 'today';
  stock: number;
  status: ProductStatus;
  adminComment?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Producer {
  id: string;
  name: string;
  verified: boolean;
  location: string;
  rating: number;
  totalOrders: number;
  photo?: string;
  phone: string;
  status: ProducerStatus;
  adminComment?: string;
}

export interface ProducerRequest {
  id: string;
  name: { fr: string; ar: string; 'ar-tn': string };
  phone: string;
  farmName: { fr: string; ar: string; 'ar-tn': string };
  district: string;
  photos: string[];
  status: 'pending' | 'approved' | 'rejected';
  adminComment?: string;
  createdAt: Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'in-transit' | 'delivered' | 'cancelled';
  deliveryAddress: string;
  deliverySlot: string;
  paymentMethod: 'cash' | 'online';
  createdAt: Date;
  consumerPhone: string;
  consumerName: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  role: 'consumer' | 'producer' | 'admin';
  producerProfile?: Producer;
}