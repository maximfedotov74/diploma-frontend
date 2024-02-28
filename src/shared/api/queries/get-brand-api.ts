import { useQuery } from '@tanstack/react-query';
import { GET_ONE_BRAND } from '../query-keys/brand';
import { getApiBrandSlug } from '../generated';
import { CACHE_FIVE_MIN } from '@/shared/constants/cache-time';

export const useGetBrandApi = (slug: string) => {
	return useQuery({
		queryKey: [GET_ONE_BRAND, slug],
		queryFn: () => getApiBrandSlug(slug),
		staleTime: CACHE_FIVE_MIN,
		enabled: slug === '' ? false : true,
	});
};
