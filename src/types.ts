export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: 'user' | 'admin';
  createdAt?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  icon: string;
  features?: string[];
}

export interface Order {
  id: string;
  userId: string;
  serviceId: string;
  serviceTitle?: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  paymentStatus: 'unpaid' | 'paid';
  paymentMethod?: string;
  amount: number;
  domain?: string;
  transactionId?: string;
  paymentScreenshot?: string;
  createdAt: any;
  updatedAt?: any;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  link?: string;
  tags?: string[];
}

export interface Booking {
  id: string;
  userId: string;
  date: string;
  topic: string;
  meetLink?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Review {
  id: string;
  authorName: string;
  authorRole: string;
  content: string;
  rating: number;
  photoURL?: string;
  createdAt: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Stat {
  label: string;
  value: string;
}
