import { CreateOrderItem } from '@/types';
import { supabase } from '@/lib/supabase';
import { useMutation } from '@tanstack/react-query';

//Create OrderItems
export const useInsertOrderItems = () => {
	return useMutation({
		async mutationFn(items: CreateOrderItem[]) {
			const { data: newOrderItems, error } = await supabase
				.from('order_items')
				.insert(items)
				.select();

			if (error) {
				throw new Error(error.message);
			}
			//console.log({ newOrderItems });
			return newOrderItems;
		},
	});
};
