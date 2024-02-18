import { useQuery } from '@tanstack/react-query';
import { GET_CATEGORIES_WITHOUT_CHILDREN } from '../query-keys/category';
import { getApiCategoryWithoutChildren } from '../generated';
import { CACHE_FIVE_MIN } from '@/shared/constants/cache-time';

export const useGetCategoriesWithoutChildren = () => {
	return useQuery({
		queryKey: [GET_CATEGORIES_WITHOUT_CHILDREN],
		queryFn: () => getApiCategoryWithoutChildren(),
		staleTime: CACHE_FIVE_MIN,
	});
};
