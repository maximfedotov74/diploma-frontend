import {
	ModelAddModelToActionDto,
	ModelCreateProductModelDto,
	postApiActionModel,
	postApiProductModel,
} from '@/shared/api/generated';
import {
	ACTION_MODELS,
	ADD_MODEL_TO_ACTION,
} from '@/shared/api/query-keys/action';
import {} from '@/shared/api/query-keys/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddModelToActionApi = (id: string) => {
	const queryCLient = useQueryClient();

	const { mutateAsync: addModelToAction } = useMutation({
		mutationKey: [ADD_MODEL_TO_ACTION],
		mutationFn: (dto: ModelAddModelToActionDto) => postApiActionModel(dto),
		onSuccess: () => {
			queryCLient.invalidateQueries({ queryKey: [ACTION_MODELS, id] });
		},
	});

	return addModelToAction;
};
