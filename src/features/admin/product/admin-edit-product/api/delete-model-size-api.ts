import { deleteApiCharacteristicsSizeModelId } from '@/shared/api/generated';
import { DELETE_MODEL_SIZE } from '@/shared/api/query-keys/characteristics';
import { ALL_MODEL_SIZES } from '@/shared/api/query-keys/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteModelSizeApi = (modelId: number) => {
	const queryCLient = useQueryClient();

	const { mutateAsync: deleteModelSize } = useMutation({
		mutationKey: [DELETE_MODEL_SIZE],
		mutationFn: (modelSizeId: number) =>
			deleteApiCharacteristicsSizeModelId(modelSizeId),
		onSuccess: () => {
			queryCLient.invalidateQueries({ queryKey: [ALL_MODEL_SIZES, modelId] });
		},
	});

	return deleteModelSize;
};
