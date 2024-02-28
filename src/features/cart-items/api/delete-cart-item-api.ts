import { deleteApiWishCartModelSizeId } from '@/shared/api/generated';
import { DELETE_CART_ITEM, GET_CART } from '@/shared/api/query-keys/wishlist';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteCartItemApi = () => {
	const qc = useQueryClient();
	const { mutateAsync: deleteCartItem } = useMutation({
		mutationKey: [DELETE_CART_ITEM],
		mutationFn: (modelSizeId: number) =>
			deleteApiWishCartModelSizeId(modelSizeId),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [GET_CART] });
		},
	});
	return deleteCartItem;
};
