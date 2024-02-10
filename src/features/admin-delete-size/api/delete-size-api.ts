import { deleteApiCharacteristicsSizeId } from '@/shared/api/generated';
import {
	ALL_SIZES,
	DELETE_SIZE,
} from '@/shared/api/query-keys/characteristics';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteSizeApi = () => {
	const queryCLient = useQueryClient();

	const { mutateAsync: deleteSize } = useMutation({
		mutationKey: [DELETE_SIZE],
		mutationFn: (id: number) => deleteApiCharacteristicsSizeId(id),
		onSuccess: () => {
			queryCLient.invalidateQueries({ queryKey: [ALL_SIZES] });
		},
	});
	return deleteSize;
};
