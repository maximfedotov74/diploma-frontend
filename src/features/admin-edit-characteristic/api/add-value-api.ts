import {
	ModelCreateOptionValueDto,
	postApiCharacteristicsValue,
} from '@/shared/api/generated';
import {
	ADD_VALUE,
	CHARACTERISTICS_VALUES,
} from '@/shared/api/query-keys/characteristics';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddValue = (optionId: number) => {
	const queryClient = useQueryClient();
	const { mutateAsync: addValue } = useMutation({
		mutationKey: [ADD_VALUE],
		mutationFn: (dto: ModelCreateOptionValueDto) =>
			postApiCharacteristicsValue(dto),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [CHARACTERISTICS_VALUES, optionId],
			});
		},
	});
	return addValue;
};
