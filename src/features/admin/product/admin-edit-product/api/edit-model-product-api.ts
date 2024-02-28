import {
	ModelUpdateProductModelDto,
	patchApiProductModelId,
} from '@/shared/api/generated';
import {
	ADMIN_PRODUCTS_MODELS,
	EDIT_PRODUCT_MODEL,
	SEARCH_MODELS_ARTICLE,
} from '@/shared/api/query-keys/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useEditModelProductApi = (productId: number) => {
	const queryCLient = useQueryClient();

	const { mutateAsync: editProductModel } = useMutation({
		mutationKey: [EDIT_PRODUCT_MODEL],
		mutationFn: ({
			dto,
			id,
		}: {
			id: number;
			dto: ModelUpdateProductModelDto;
		}) => patchApiProductModelId(id, dto),
		onSuccess: () => {
			queryCLient.invalidateQueries({
				queryKey: [ADMIN_PRODUCTS_MODELS, productId],
			});
			queryCLient.invalidateQueries({
				queryKey: [SEARCH_MODELS_ARTICLE],
			});
		},
	});

	return editProductModel;
};
