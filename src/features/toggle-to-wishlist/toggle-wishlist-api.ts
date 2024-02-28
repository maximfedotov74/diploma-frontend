import { postApiWish } from '@/shared/api/generated';
import {
	GET_WISHLIST,
	TOGGLE_WISHLIST,
} from '@/shared/api/query-keys/wishlist';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useToggleWishListApi = () => {
	const queryClient = useQueryClient();
	const { mutateAsync } = useMutation({
		mutationKey: [TOGGLE_WISHLIST],
		mutationFn: (modelId: number) => postApiWish({ model_id: modelId }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [GET_WISHLIST] });
		},
	});
	return mutateAsync;
};
