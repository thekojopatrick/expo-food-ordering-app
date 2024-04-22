import { CartItem, Order, Product } from '@/types';
import { PropsWithChildren, createContext, useContext, useState } from 'react';

import { randomUUID } from 'expo-crypto';
import { useInsertOrder } from '@/api/orders';
import { useInsertOrderItems } from '@/api/order-items';
import { useRouter } from 'expo-router';

type CartProps = {
	items: CartItem[];
	addItem: (product: Product, size: CartItem['size']) => void;
	updateQuantity: (itemId: string, amount: -1 | 1) => void;
	total: number;
	checkout: () => void;
};
const CartContext = createContext<CartProps>({
	items: [],
	addItem: () => {},
	updateQuantity: () => {},
	total: 0,
	checkout: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
	const [items, setItems] = useState<CartItem[]>([]);
	const { mutate: createOrder } = useInsertOrder();
	const { mutate: createOrderItems } = useInsertOrderItems();
	const router = useRouter();

	const addItem = (product: Product, size: CartItem['size']) => {
		//if already in cart,generate quantity
		const existingItem = items.find(
			(item) => item.product === product && item.size === size
		);

		if (existingItem) {
			updateQuantity(existingItem.id, 1);
			return;
		}

		// console.log({ product });
		const newCartItem: CartItem = {
			id: randomUUID(),
			product,
			product_id: product.id,
			size,
			quantity: 1,
		};

		setItems([newCartItem, ...items]);
	};

	//Update Quantity
	const updateQuantity = (itemId: string, amount: -1 | 1) => {
		//find the item and update its quantity
		console.log(itemId, amount);
		const updatedItems = items
			.map((item) => {
				if (item.id === itemId) {
					return { ...item, quantity: item.quantity + amount };
				} else return item;
			})
			.filter((item) => item.quantity > 0); //remove if no more left in stock

		setItems(updatedItems);
	};

	const total = items.reduce(
		(sum, item) => (sum += item.product.price * item.quantity),
		0
	);

	const clearCart = () => {
		setItems([]);
	};

	const checkout = () => {
		if (total !== 0) {
			createOrder(
				{ total },
				{
					onSuccess: savedOrderItems,
				}
			);
		}
	};

	const savedOrderItems = (order: Order) => {
		const orderItems = items.map((cartItem) => ({
			order_id: order.id,
			product_id: cartItem.product_id,
			quantity: cartItem.quantity,
			size: cartItem.size,
		}));

		createOrderItems(orderItems, {
			onSuccess: () => {
				clearCart();
				console.log({ orderItems });
				router.navigate(`/(user)/orders/${order.id}`);
			},
		});
	};

	return (
		<CartContext.Provider
			value={{ items, total, addItem, updateQuantity, checkout }}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
