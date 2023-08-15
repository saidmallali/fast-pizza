export interface Pizza {
  pizzaId: number;
  name: string;
  quantity: number;
  totalPrice: number;
  unitPrice: number;
  id?: number;
  imageUrl?: string;
  ingredients?: string[];
  soldOut?: boolean;
}
