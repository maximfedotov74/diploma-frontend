import {
	ModelAddSizeToProductModelDto,
	postApiCharacteristicsSizeModel,
} from '@/shared/api/generated';
import {
	ADD_MODEL_SIZE,
	ALL_MODEL_SIZES,
} from '@/shared/api/query-keys/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddModelSize = (modelId: number) => {
	const queryCLient = useQueryClient();

	const { mutateAsync: addModelSize } = useMutation({
		mutationKey: [ADD_MODEL_SIZE],
		mutationFn: (dto: ModelAddSizeToProductModelDto) =>
			postApiCharacteristicsSizeModel(dto),
		onSuccess: () => {
			queryCLient.invalidateQueries({ queryKey: [ALL_MODEL_SIZES, modelId] });
		},
	});

	return addModelSize;
};
