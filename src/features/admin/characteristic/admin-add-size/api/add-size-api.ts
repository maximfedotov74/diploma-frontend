import {
	ModelCreateSizeDto,
	postApiCharacteristicsSize,
} from '@/shared/api/generated';
import { ADD_SIZE, ALL_SIZES } from '@/shared/api/query-keys/characteristics';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddSize = () => {
	const queryCLient = useQueryClient();

	const { mutateAsync: createSize } = useMutation({
		mutationKey: [ADD_SIZE],
		mutationFn: (dto: ModelCreateSizeDto) => postApiCharacteristicsSize(dto),
		onSuccess: () => {
			queryCLient.invalidateQueries({ queryKey: [ALL_SIZES] });
		},
	});
	return createSize;
};
