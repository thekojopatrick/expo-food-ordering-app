import { CreateOrder, OrderStatusList, UpdateOrder } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';

export const useAdminOrderList = ({ archived = false }) => {
	const statuses = archived ? ['Delivered'] : OrderStatusList.slice(0, -1);

	const {
		error,
		isLoading,
		data: orders,
	} = useQuery({
		queryKey: ['orders', { archived }],
		queryFn: async () => {
			const { data, error, status } = await supabase
				.from('orders')
				.select(`*`)
				.in('status', statuses)
				.order('created_at', { ascending: false });

			if (error) {
				throw new Error(error.message);
			}
			console.log({ status });

			return data;
		},
	});

	return { orders, isLoading, error };
};
export const useMyOrderList = () => {
	const { session } = useAuth();

	const id = session?.user.id;

	const {
		error,
		isLoading,
		data: orders,
	} = useQuery({
		queryKey: ['orders', { userId: id }],
		queryFn: async () => {
			if (!id) return null;
			const { data, error, status } = await supabase
				.from('orders')
				.select(`*`)
				.eq('user_id', id);

			if (error) {
				throw new Error(error.message);
			}

			return data;
		},
	});

	return { orders, isLoading, error };
};

export const useOrderDetails = (id: number) => {
	return useQuery({
		queryKey: [`orders`, id],
		queryFn: async () => {
			const { data, error } = await supabase
				.from('orders')
				.select()
				.eq('id', id)
				.single();

			if (error) {
				throw new Error(error.message);
			}
			return data;
		},
	});
};

//Create Order
export const useInsertOrder = () => {
	const queryClient = useQueryClient();
	const { session } = useAuth();
	const userId = session?.user.id;

	return useMutation({
		async mutationFn(data: CreateOrder) {
			const { data: newOrder, error } = await supabase
				.from('orders')
				.insert({ ...data, user_id: userId })
				.select()
				.single();

			if (error) {
				throw new Error(error.message);
			}

			//console.log({ newOrder });
			return newOrder;
		},

		async onSuccess(orderData) {
			console.log({ orderData });

			await queryClient.invalidateQueries({ queryKey: ['orders'] });
			//await queryClient.invalidateQueries({ queryKey: ['orders', userId] });
			await queryClient.setQueryData(['orders'], orderData);
		},
	});
};

//Update Order
export const useUpdateOrder = () => {
	const queryClient = useQueryClient();

	return useMutation({
		async mutationFn({
			id,
			updatedFields,
		}: {
			id: number;
			updatedFields: UpdateOrder;
		}) {
			const { error, data: updatedOrder } = await supabase
				.from('orders')
				.update(updatedFields)
				.eq('id', id)
				.select()
				.single();

			if (error) {
				throw new Error(error.message);
			}
			return updatedOrder;
		},
		async onSuccess(data, { id }) {
			await queryClient.invalidateQueries({ queryKey: ['orders'] });
			//await queryClient.invalidateQueries({ queryKey: ['orders', id] });
			await queryClient.setQueryData(['orders', { id }], data);
		},
	});
};
