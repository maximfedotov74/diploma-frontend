import { useQuery } from '@tanstack/react-query';
import { getApiCategoryRelationSlug } from '../generated';
import { CACHE_FIVE_MIN } from '@/shared/constants/cache-time';
import { GET_ONE_CATEGORY } from '../query-keys/category';

export const useGetCategoryApi = (slug: string) => {
	return useQuery({
		queryKey: [GET_ONE_CATEGORY, slug],
		queryFn: () => getApiCategoryRelationSlug(slug),
		staleTime: CACHE_FIVE_MIN,
		enabled: slug === '' ? false : true,
	});
};
