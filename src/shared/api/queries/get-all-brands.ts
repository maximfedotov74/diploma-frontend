import { useQuery } from '@tanstack/react-query';
import { ALL_BRANDS } from '../query-keys/brand';
import { getApiBrand } from '../generated';
import { CACHE_FIVE_MIN } from '@/shared/constants/cache-time';

export const useGetAllBrands = () => {
	return useQuery({
		queryKey: [ALL_BRANDS],
		queryFn: () => getApiBrand(),
		staleTime: CACHE_FIVE_MIN,
	});
};
