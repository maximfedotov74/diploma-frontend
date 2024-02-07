import { ModelCreateProductDto, postApiProduct } from '@/shared/api/generated';
import {
	ADMIN_PRODUCTS,
	CREATE_PRODUCT,
} from '@/shared/api/query-keys/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddProductApi = () => {
	const queryCLient = useQueryClient();

	const { mutateAsync: createProduct } = useMutation({
		mutationKey: [CREATE_PRODUCT],
		mutationFn: (dto: ModelCreateProductDto) => postApiProduct(dto),
		onSuccess: () => {
			queryCLient.invalidateQueries({ queryKey: [ADMIN_PRODUCTS] });
		},
	});

	return { createProduct };
};
