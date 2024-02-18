import {
	ModelAddOptionToProductModelDto,
	postApiCharacteristicsOptionModel,
} from '@/shared/api/generated';
import {
	ADD_MODEL_OPTION,
	ALL_MODEL_OPTIONS,
} from '@/shared/api/query-keys/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddModelOption = (modelId: number) => {
	const queryCLient = useQueryClient();

	const { mutateAsync: addModelOption } = useMutation({
		mutationKey: [ADD_MODEL_OPTION],
		mutationFn: (dto: ModelAddOptionToProductModelDto) =>
			postApiCharacteristicsOptionModel(dto),
		onSuccess: () => {
			queryCLient.invalidateQueries({ queryKey: [ALL_MODEL_OPTIONS, modelId] });
		},
	});

	return addModelOption;
};
