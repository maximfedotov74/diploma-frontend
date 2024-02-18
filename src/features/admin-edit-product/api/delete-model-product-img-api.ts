import { deleteApiProductModelImgImgId } from '@/shared/api/generated';
import {
	ALL_MODEL_IMG,
	DELETE_MODEL_IMG,
} from '@/shared/api/query-keys/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteProductModelImgApi = (modelId: number) => {
	const queryCLient = useQueryClient();

	const { mutateAsync: deleteProductModelImg } = useMutation({
		mutationKey: [DELETE_MODEL_IMG],
		mutationFn: (imageId: number) => deleteApiProductModelImgImgId(imageId),
		onSuccess: () => {
			queryCLient.invalidateQueries({
				queryKey: [ALL_MODEL_IMG, modelId],
			});
		},
	});

	return deleteProductModelImg;
};
