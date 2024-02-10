import {
	ModelUpdateOptionValueDto,
	patchApiCharacteristicsValueId,
} from '@/shared/api/generated';
import {
	CHARACTERISTICS_VALUES,
	EDIT_CHARACTERISTIC_VALUE,
} from '@/shared/api/query-keys/characteristics';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useEditValue = (optionId: number) => {
	const queryClient = useQueryClient();
	const { mutateAsync: editValue } = useMutation({
		mutationKey: [EDIT_CHARACTERISTIC_VALUE],
		mutationFn: ({ dto, id }: { id: number; dto: ModelUpdateOptionValueDto }) =>
			patchApiCharacteristicsValueId(id, dto),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [CHARACTERISTICS_VALUES, optionId],
			});
		},
	});
	return editValue;
};
