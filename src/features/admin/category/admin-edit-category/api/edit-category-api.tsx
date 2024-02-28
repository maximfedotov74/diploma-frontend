import {
	ModelUpdateCategoryDto,
	patchApiCategoryId,
} from '@/shared/api/generated';
import {
	ALL_CATEGORIES,
	EDIT_CATEGORY,
	GET_CATEGORIES_WITHOUT_CHILDREN,
} from '@/shared/api/query-keys/category';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useEditCategoryApi = () => {
	const queryCLient = useQueryClient();

	const { mutateAsync: editCategory } = useMutation({
		mutationKey: [EDIT_CATEGORY],
		mutationFn: ({ dto, id }: { id: number; dto: ModelUpdateCategoryDto }) =>
			patchApiCategoryId(id, dto),
		onSuccess: () => {
			queryCLient.invalidateQueries({ queryKey: [ALL_CATEGORIES] });
			queryCLient.invalidateQueries({
				queryKey: [GET_CATEGORIES_WITHOUT_CHILDREN],
			});
		},
	});
	return editCategory;
};
