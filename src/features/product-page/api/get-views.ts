import { getApiProductModelViewsId } from '@/shared/api/generated';
import { GET_VIEWS } from '@/shared/api/query-keys/product';
import { CACHE_FIVE_MIN } from '@/shared/constants/cache-time';
import { useQuery } from '@tanstack/react-query';

export const useGetViews = (modelId: number) => {
	return useQuery({
		queryKey: [GET_VIEWS, modelId],
		queryFn: () => getApiProductModelViewsId(modelId),
		staleTime: CACHE_FIVE_MIN,
	});
};
