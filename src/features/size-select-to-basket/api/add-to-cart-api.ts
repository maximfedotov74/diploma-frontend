import { ModelAddToCartDto, postApiWishCart } from '@/shared/api/generated';

import { ADD_TO_CART, GET_CART } from '@/shared/api/query-keys/wishlist';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddToCartApi = () => {
	const queryCLient = useQueryClient();

	const { mutateAsync: addToCart } = useMutation({
		mutationKey: [ADD_TO_CART],
		mutationFn: (dto: ModelAddToCartDto) => postApiWishCart(dto),
		onSuccess: () => {
			queryCLient.invalidateQueries({ queryKey: [GET_CART] });
		},
	});

	return addToCart;
};
