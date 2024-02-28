import { patchApiWishCartReduceModelSizeId } from '@/shared/api/generated';
import { GET_CART, REDUCE_QUANTITY } from '@/shared/api/query-keys/wishlist';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useReduceQuantityApi = () => {
	const qc = useQueryClient();
	const { mutateAsync: reduceQuantity } = useMutation({
		mutationKey: [REDUCE_QUANTITY],
		mutationFn: (modelSizeId: number) =>
			patchApiWishCartReduceModelSizeId(modelSizeId),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [GET_CART] });
		},
	});
	return reduceQuantity;
};
