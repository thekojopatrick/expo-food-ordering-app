import { CreateProduct, UpdateProduct } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
		async mutationFn(data: CreateProduct) {
			const { data: newProduct, error } = await supabase
				.from('products')
				.insert(data)
				.single();

			if (error) {
				throw new Error(error.message);
			}
			//console.log({ newProduct });
			return newProduct;
		},

		async onSuccess(data) {
			await queryClient.invalidateQueries({ queryKey: ['products'] });
			await queryClient.setQueryData(['products'], data);
		},
	});
};

//Update Product
export const useUpdateProduct = () => {
	const queryClient = useQueryClient();

	return useMutation({
		async mutationFn(data: UpdateProduct) {
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
		async onSuccess(data, { id }) {
			await queryClient.invalidateQueries({ queryKey: ['products'] });
			//await queryClient.invalidateQueries({ queryKey: ['products', id] });
			await queryClient.setQueryData(['products', { id }], data);
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
