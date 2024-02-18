import { deleteApiCharacteristicsValueId } from '@/shared/api/generated';
import {
	ALL_CHARACTERISTICS,
	DELETE_VALUE,
} from '@/shared/api/query-keys/characteristics';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteValue = () => {
	const queryCLient = useQueryClient();

	const { mutateAsync: deleteValue } = useMutation({
		mutationKey: [DELETE_VALUE],
		mutationFn: (id: number) => deleteApiCharacteristicsValueId(id),
		onSuccess: () => {
			queryCLient.invalidateQueries({
				queryKey: [ALL_CHARACTERISTICS],
			});
		},
	});
	return deleteValue;
};
