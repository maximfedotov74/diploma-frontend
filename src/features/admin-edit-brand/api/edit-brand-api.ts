import { ModelUpdateBrandDto, patchApiBrandId } from '@/shared/api/generated';
import { ALL_BRANDS, EDIT_BRAND } from '@/shared/api/query-keys/brand';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useEditBrandApi = () => {
	const queryCLient = useQueryClient();

	const { mutateAsync: editBrand } = useMutation({
		mutationKey: [EDIT_BRAND],
		mutationFn: ({ id, dto }: { id: number; dto: ModelUpdateBrandDto }) =>
			patchApiBrandId(id, dto),
		onSuccess: () => {
			queryCLient.invalidateQueries({ queryKey: [ALL_BRANDS] });
		},
	});
	return editBrand;
};
