import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';

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
