import { deleteApiBrandSlug } from '@/shared/api/generated';
import { ALL_BRANDS, DELETE_BRAND } from '@/shared/api/query-keys/brand';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteBrandApi = () => {
	const queryCLient = useQueryClient();

	const { mutateAsync: deleteBrand } = useMutation({
		mutationKey: [DELETE_BRAND],
		mutationFn: (slug: string) => deleteApiBrandSlug(slug),
		onSuccess: () => {
			queryCLient.invalidateQueries({ queryKey: [ALL_BRANDS] });
		},
	});
	return deleteBrand;
};
