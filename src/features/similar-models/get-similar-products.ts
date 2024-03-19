import { getApiProductModelSimilarModelsId } from '@/shared/api/generated';
import { GET_SIMILAR_PRODUCTS } from '@/shared/api/query-keys/product';
import { CACHE_FIVE_MIN } from '@/shared/constants/cache-time';
import { useQuery } from '@tanstack/react-query';

export const useGetSimilarProducts = (
	modelId: number,
	categoryId: number,
	brandId: number
) => {
	return useQuery({
		queryKey: [GET_SIMILAR_PRODUCTS, modelId, categoryId, brandId],
		queryFn: () =>
			getApiProductModelSimilarModelsId(modelId, { brandId, categoryId }),
		staleTime: CACHE_FIVE_MIN,
	});
};
