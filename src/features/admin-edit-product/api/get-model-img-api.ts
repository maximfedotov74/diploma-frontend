import { getApiProductModelImgId } from '@/shared/api/generated';
import { ALL_MODEL_IMG } from '@/shared/api/query-keys/product';
import { CACHE_FIVE_MIN } from '@/shared/constants/cache-time';
import { useQuery } from '@tanstack/react-query';

export const useGetModelImagesApi = (modelId: number) => {
	return useQuery({
		queryKey: [ALL_MODEL_IMG, modelId],
		queryFn: () => getApiProductModelImgId(modelId),
		staleTime: CACHE_FIVE_MIN,
	});
};
