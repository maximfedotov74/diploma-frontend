import { getApiProductModelOptionsId } from '@/shared/api/generated';
import { ALL_MODEL_OPTIONS } from '@/shared/api/query-keys/product';
import { CACHE_FIVE_MIN } from '@/shared/constants/cache-time';
import { useQuery } from '@tanstack/react-query';

export const useGetModelOptionsApi = (modelId: number) => {
	return useQuery({
		queryKey: [ALL_MODEL_OPTIONS, modelId],
		queryFn: () => getApiProductModelOptionsId(modelId),
		staleTime: CACHE_FIVE_MIN,
	});
};
