import { getApiProductModelSizesId } from '@/shared/api/generated';
import { ALL_MODEL_SIZES } from '@/shared/api/query-keys/product';
import { CACHE_FIVE_MIN } from '@/shared/constants/cache-time';
import { useQuery } from '@tanstack/react-query';

export const useGetModelSizesApi = (modelId: number) => {
	return useQuery({
		queryKey: [ALL_MODEL_SIZES, modelId],
		queryFn: () => getApiProductModelSizesId(modelId),
		staleTime: CACHE_FIVE_MIN,
	});
};
