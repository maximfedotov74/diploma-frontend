import {
	ModelCreateCategoryDto,
	postApiCategory,
} from '@/shared/api/generated';
import { ADD_CATEGORY, ALL_CATEGORIES } from '@/shared/api/query-keys/category';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddCategoryApi = () => {
	const queryCLient = useQueryClient();

	const { mutateAsync: createCategory } = useMutation({
		mutationKey: [ADD_CATEGORY],
		mutationFn: (dto: ModelCreateCategoryDto) => postApiCategory(dto),
		onSuccess: () => {
			queryCLient.invalidateQueries({ queryKey: [ALL_CATEGORIES] });
		},
	});
	return createCategory;
};
