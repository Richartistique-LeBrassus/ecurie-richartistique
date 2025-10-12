export interface OrderProduct {
  product: { _ref: string }; 
  quantity?: number;
}

export interface Order {
  orderNumber: string;
  stripeCheckoutSessionId?: string;
  stripeCustomerId: string;
  clerkUserId: string;
  customerName: string;
  email: string;
  stripePaymentIntentId: string;
  products: OrderProduct[];
  totalPrice: number;
  currency: string;
  amountDiscount?: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string; 
}