import { ModelCreateBrandDto, postApiBrand } from '@/shared/api/generated';
import { ADD_BRAND, ALL_BRANDS } from '@/shared/api/query-keys/brand';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddBrandApi = () => {
	const queryCLient = useQueryClient();

	const { mutateAsync: createBrand } = useMutation({
		mutationKey: [ADD_BRAND],
		mutationFn: (dto: ModelCreateBrandDto) => postApiBrand(dto),
		onSuccess: () => {
			queryCLient.invalidateQueries({ queryKey: [ALL_BRANDS] });
		},
	});
	return createBrand;
};
