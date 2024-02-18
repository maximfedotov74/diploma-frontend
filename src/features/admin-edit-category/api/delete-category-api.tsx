import { deleteApiCategorySlug } from '@/shared/api/generated';
import {
	ALL_CATEGORIES,
	DELETE_CATEGORY,
	GET_CATEGORIES_WITHOUT_CHILDREN,
} from '@/shared/api/query-keys/category';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteCategoryApi = () => {
	const queryCLient = useQueryClient();

	const { mutateAsync: deleteCategory } = useMutation({
		mutationKey: [DELETE_CATEGORY],
		mutationFn: (slug: string) => deleteApiCategorySlug(slug),
		onSuccess: () => {
			queryCLient.invalidateQueries({ queryKey: [ALL_CATEGORIES] });
			queryCLient.invalidateQueries({
				queryKey: [GET_CATEGORIES_WITHOUT_CHILDREN],
			});
		},
	});
	return deleteCategory;
};
