import { deleteApiCategorySlug } from '@/shared/api/generated';
import {
	ALL_CATEGORIES,
	DELETE_CATEGORY,
} from '@/shared/api/query-keys/category';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteCategoryApi = () => {
	const queryCLient = useQueryClient();

	const { mutateAsync: deleteCategory } = useMutation({
		mutationKey: [DELETE_CATEGORY],
		mutationFn: (slug: string) => deleteApiCategorySlug(slug),
		onSuccess: () => {
			queryCLient.invalidateQueries({ queryKey: [ALL_CATEGORIES] });
		},
	});
	return deleteCategory;
};
