import {
	ModelCreateOptionValueDto,
	postApiCharacteristicsValue,
} from '@/shared/api/generated';
import {
	ADD_VALUE,
	ALL_CHARACTERISTICS,
} from '@/shared/api/query-keys/characteristics';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddValue = () => {
	const queryClient = useQueryClient();
	const { mutateAsync: addValue } = useMutation({
		mutationKey: [ADD_VALUE],
		mutationFn: (dto: ModelCreateOptionValueDto) =>
			postApiCharacteristicsValue(dto),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [ALL_CHARACTERISTICS],
			});
		},
	});
	return addValue;
};
