import {
	ModelUpdateOptionDto,
	patchApiCharacteristicsOptionId,
} from '@/shared/api/generated';
import {
	ALL_CHARACTERISTICS,
	EDIT_CHARACTERISTIC,
} from '@/shared/api/query-keys/characteristics';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useEditCharacteristicApi = () => {
	const queryClient = useQueryClient();

	const { mutateAsync: editCharacteristic } = useMutation({
		mutationKey: [EDIT_CHARACTERISTIC],
		mutationFn: ({ dto, id }: { id: number; dto: ModelUpdateOptionDto }) =>
			patchApiCharacteristicsOptionId(id, dto),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [ALL_CHARACTERISTICS] });
		},
	});
	return editCharacteristic;
};
