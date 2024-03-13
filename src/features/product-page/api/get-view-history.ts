import { getApiProductModelViewsHistoryId } from '@/shared/api/generated';
import { GET_VIEW_HISTORY } from '@/shared/api/query-keys/product';
import { CACHE_FIVE_MIN } from '@/shared/constants/cache-time';
import { useQuery } from '@tanstack/react-query';

export const useGetViewHistory = (modelId: number) => {
	return useQuery({
		queryKey: [GET_VIEW_HISTORY, modelId],
		queryFn: () => getApiProductModelViewsHistoryId(modelId),
		staleTime: CACHE_FIVE_MIN,
	});
};
