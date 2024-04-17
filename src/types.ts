import { Tables } from './database.types';

export type Product = Tables<'products'>;
export type CreateProduct = Omit<Product, 'id' | 'created_at'>;
export type UpdateProduct = Omit<Product, 'created_at'>;

export type PizzaSize = 'S' | 'M' | 'L' | 'XL';

export type CartItem = {
	id: string;
	product: Product;
	product_id: number;
	size: PizzaSize;
	quantity: number;
};

export const OrderStatusList: OrderStatus[] = [
	'New',
	'Cooking',
	'Delivering',
	'Delivered',
];

export type OrderStatus = 'New' | 'Cooking' | 'Delivering' | 'Delivered';

export type Order = {
	id: number;
	created_at: string;
	total: number;
	user_id: string;
	status: OrderStatus;
	order_items?: OrderItem[];
};

export type OrderItem = {
	id: number;
	product_id: number;
	products: Product;
	order_id: number;
	size: PizzaSize;
	quantity: number;
};

export type Profile = {
	id: string;
	group: string;
};
