import { deleteApiCharacteristicsValueId } from '@/shared/api/generated';
import {
	CHARACTERISTICS_VALUES,
	DELETE_VALUE,
} from '@/shared/api/query-keys/characteristics';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteValue = (optionId: number) => {
	const queryCLient = useQueryClient();

	const { mutateAsync: deleteValue } = useMutation({
		mutationKey: [DELETE_VALUE],
		mutationFn: (id: number) => deleteApiCharacteristicsValueId(id),
		onSuccess: () => {
			queryCLient.invalidateQueries({
				queryKey: [CHARACTERISTICS_VALUES, optionId],
			});
		},
	});
	return deleteValue;
};
