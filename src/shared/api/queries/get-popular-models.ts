import { useQuery } from '@tanstack/react-query';
import { getApiProductModelPopularCategorySlug } from '../generated';
import { CACHE_FIVE_MIN } from '@/shared/constants/cache-time';
import { GET_POPULAR_MODELS } from '../query-keys/product';

export const useGetPopularModels = (slug: string) => {
	return useQuery({
		queryKey: [GET_POPULAR_MODELS, slug],
		queryFn: () => getApiProductModelPopularCategorySlug(slug),
		staleTime: CACHE_FIVE_MIN,
	});
};
