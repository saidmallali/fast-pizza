import { Cart } from "./Cart";

export interface Order {
  id: string;
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  estimatedDelivery: string;
  priorityPrice: number;
  orderPrice: number;
  cart: Cart[];
  status: string;
}
