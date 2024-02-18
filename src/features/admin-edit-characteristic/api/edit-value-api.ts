import {
	ModelUpdateOptionValueDto,
	patchApiCharacteristicsValueId,
} from '@/shared/api/generated';
import {
	ALL_CHARACTERISTICS,
	EDIT_CHARACTERISTIC_VALUE,
} from '@/shared/api/query-keys/characteristics';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useEditValue = () => {
	const queryClient = useQueryClient();
	const { mutateAsync: editValue } = useMutation({
		mutationKey: [EDIT_CHARACTERISTIC_VALUE],
		mutationFn: ({ dto, id }: { id: number; dto: ModelUpdateOptionValueDto }) =>
			patchApiCharacteristicsValueId(id, dto),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [ALL_CHARACTERISTICS],
			});
		},
	});
	return editValue;
};
