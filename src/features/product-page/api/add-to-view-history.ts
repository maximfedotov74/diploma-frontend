import { postApiProductModelViewsHistoryId } from '@/shared/api/generated';
import { ADD_TO_HISTORY } from '@/shared/api/query-keys/product';
import { useMutation } from '@tanstack/react-query';

export const useAddToHistory = () => {
	const { mutateAsync: addToHistory } = useMutation({
		mutationKey: [ADD_TO_HISTORY],
		mutationFn: (modelId: number) => postApiProductModelViewsHistoryId(modelId),
	});
	return addToHistory;
};
