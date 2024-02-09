import { deleteApiProductId } from '@/shared/api/generated';
import {
	ADMIN_PRODUCTS,
	DELETE_PRODUCT,
} from '@/shared/api/query-keys/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteProductApi = () => {
	const queryCLient = useQueryClient();

	const { mutateAsync: deleteProduct } = useMutation({
		mutationKey: [DELETE_PRODUCT],
		mutationFn: (id: number) => deleteApiProductId(id),
		onSuccess: () => {
			queryCLient.invalidateQueries({ queryKey: [ADMIN_PRODUCTS] });
		},
	});

	return { deleteProduct };
};
