import {
	ModelCreateProducModelImg,
	postApiProductModelImg,
} from '@/shared/api/generated';
import { ADD_MODEL_IMG, ALL_MODEL_IMG } from '@/shared/api/query-keys/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddModelProductImgApi = (modelId: number) => {
	const queryCLient = useQueryClient();

	const { mutateAsync: createProductModelImg } = useMutation({
		mutationKey: [ADD_MODEL_IMG],
		mutationFn: (dto: ModelCreateProducModelImg) => postApiProductModelImg(dto),
		onSuccess: () => {
			queryCLient.invalidateQueries({ queryKey: [ALL_MODEL_IMG, modelId] });
		},
	});

	return createProductModelImg;
};
