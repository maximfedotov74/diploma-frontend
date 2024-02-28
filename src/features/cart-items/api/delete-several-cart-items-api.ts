import {
	deleteApiWishCartModelSizeId,
	deleteApiWishCartSeveralIds,
} from '@/shared/api/generated';
import {
	DELETE_CART_ITEM,
	DELETE_SEVERAL_CART_ITEMS,
	GET_CART,
} from '@/shared/api/query-keys/wishlist';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteSeveralCartItemApi = () => {
	const qc = useQueryClient();
	const { mutateAsync: deleteSeveralCartItems } = useMutation({
		mutationKey: [DELETE_SEVERAL_CART_ITEMS],
		mutationFn: (modelSizeIds: number[]) =>
			deleteApiWishCartSeveralIds(modelSizeIds.join(',')),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [GET_CART] });
		},
	});
	return deleteSeveralCartItems;
};
