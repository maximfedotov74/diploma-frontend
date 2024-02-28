import { patchApiWishCartIncreaseModelSizeId } from '@/shared/api/generated';
import { GET_CART, INCREASE_QUANTITY } from '@/shared/api/query-keys/wishlist';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useIncreaseQuantityApi = () => {
	const qc = useQueryClient();
	const { mutateAsync: increaseQuantity } = useMutation({
		mutationKey: [INCREASE_QUANTITY],
		mutationFn: (modelSizeId: number) =>
			patchApiWishCartIncreaseModelSizeId(modelSizeId),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [GET_CART] });
		},
	});
	return increaseQuantity;
};
