import { deleteApiProductModelModelId } from '@/shared/api/generated';
import {
	ADMIN_PRODUCTS_MODELS,
	DELETE_PRODUCT_MODEL,
} from '@/shared/api/query-keys/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteProductModelApi = (productId: number) => {
	const queryCLient = useQueryClient();

	const { mutateAsync: deleteProductModel } = useMutation({
		mutationKey: [DELETE_PRODUCT_MODEL],
		mutationFn: (modelId: number) => deleteApiProductModelModelId(modelId),
		onSuccess: () => {
			queryCLient.invalidateQueries({
				queryKey: [ADMIN_PRODUCTS_MODELS, productId],
			});
		},
	});

	return { deleteProductModel };
};
