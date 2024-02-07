import { useQuery } from '@tanstack/react-query';
import { ALL_CATEGORIES } from '../query-keys/category';
import { getApiCategory } from '../generated';
import { CACHE_FIVE_MIN } from '@/shared/constants/cache-time';

export const useGetAllCategories = () => {
	return useQuery({
		queryKey: [ALL_CATEGORIES],
		queryFn: () => getApiCategory(),
		staleTime: CACHE_FIVE_MIN,
	});
};
