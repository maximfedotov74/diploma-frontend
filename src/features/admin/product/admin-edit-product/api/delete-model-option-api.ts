import { deleteApiCharacteristicsOptionModelId } from '@/shared/api/generated';
import {
	ALL_MODEL_OPTIONS,
	DELETE_MODEL_OPTION,
} from '@/shared/api/query-keys/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteModelOptionApi = (modelId: number) => {
	const queryCLient = useQueryClient();

	const { mutateAsync: deleteModelOption } = useMutation({
		mutationKey: [DELETE_MODEL_OPTION],
		mutationFn: (modelSizeId: number) =>
			deleteApiCharacteristicsOptionModelId(modelSizeId),
		onSuccess: () => {
			queryCLient.invalidateQueries({ queryKey: [ALL_MODEL_OPTIONS, modelId] });
		},
	});

	return deleteModelOption;
};
