import {
	ModelCreateProductModelDto,
	postApiProductModel,
} from '@/shared/api/generated';
import {
	ADMIN_PRODUCTS_MODELS,
	CREATE_PRODUCT_MODEL,
} from '@/shared/api/query-keys/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddProductModelApi = (id: number) => {
	const queryCLient = useQueryClient();

	const { mutateAsync: createProductModel } = useMutation({
		mutationKey: [CREATE_PRODUCT_MODEL],
		mutationFn: (dto: ModelCreateProductModelDto) => postApiProductModel(dto),
		onSuccess: () => {
			queryCLient.invalidateQueries({ queryKey: [ADMIN_PRODUCTS_MODELS, id] });
		},
	});

	return { createProductModel };
};
