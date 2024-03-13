import { postApiProductModelViewsId } from '@/shared/api/generated';
import { ADD_VIEW } from '@/shared/api/query-keys/product';
import { useMutation } from '@tanstack/react-query';

export const useAddView = () => {
	const { mutateAsync: addView } = useMutation({
		mutationKey: [ADD_VIEW],
		mutationFn: (modelId: number) => postApiProductModelViewsId(modelId),
	});
	return addView;
};
