import { deleteApiCharacteristicsOptionId } from '@/shared/api/generated';
import {
	ALL_CHARACTERISTICS,
	DELETE_CHARACTERISTIC,
} from '@/shared/api/query-keys/characteristics';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteCharacteristicApi = () => {
	const queryCLient = useQueryClient();

	const { mutateAsync: deleteCharacteristics } = useMutation({
		mutationKey: [DELETE_CHARACTERISTIC],
		mutationFn: (id: number) => deleteApiCharacteristicsOptionId(id),
		onSuccess: () => {
			queryCLient.invalidateQueries({
				queryKey: [ALL_CHARACTERISTICS],
			});
		},
	});
	return deleteCharacteristics;
};
