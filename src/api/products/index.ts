import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Product } from '@/types';
import { supabase } from '@/lib/supabase';

export const useProductList = () => {
	const {
		error,
		isLoading,
		data: products,
	} = useQuery({
		queryKey: ['products'],
		queryFn: async () => {
			const { data, error, status } = await supabase
				.from('products')
				.select(`*`);

			if (error) {
				throw new Error(error.message);
			}

			return data;
		},
	});

	return { products, isLoading, error };
};

export const useProduct = (id: number) => {
	return useQuery({
		queryKey: [`products`, id],
		queryFn: async () => {
			const { data, error } = await supabase
				.from('products')
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
//Create Product
export const useInsertProduct = () => {
	const queryClient = useQueryClient();

	return useMutation({
		async mutationFn(data: Product) {
			const {
				data: newProduct,
				error,
				status,
			} = await supabase.from('products').upsert([data]).single();

			if (error) {
				throw new Error(error.message);
			} else if (status !== 200) {
				throw new Error('Create Product Failed');
			}
			console.log({ newProduct });
			return newProduct;
		},

		async onSuccess() {
			await queryClient.invalidateQueries({ queryKey: ['products'] });
		},
	});
};

//Update Product
export const useUpdateProduct = () => {
	const queryClient = useQueryClient();

	return useMutation({
		async mutationFn(data: Product) {
			const { error, data: updatedProduct } = await supabase
				.from('products')
				.update({
					name: data.name,
					image: data.image,
					price: data.price,
				})
				.eq('id', data.id)
				.select()
				.single();

			if (error) {
				throw new Error(error.message);
			}
			return updatedProduct;
		},
		async onSuccess(_, { id }) {
			await queryClient.invalidateQueries({ queryKey: ['products'] });
			await queryClient.invalidateQueries({ queryKey: ['products', id] });
		},
	});
};

//Delete Product
export const useDeleteProduct = () => {
	const queryClient = useQueryClient();

	return useMutation({
		async mutationFn(id: number) {
			const { error } = await supabase.from('products').delete().eq('id', id);
			if (error) {
				throw new Error(error.message);
			}
		},
		async onSuccess() {
			await queryClient.invalidateQueries({ queryKey: ['products'] });
		},
	});
};
