import { useQuery } from '@tanstack/react-query';
import { getApiWish } from '../generated';
import { GET_WISHLIST } from '../query-keys/wishlist';
import { CACHE_FIVE_MIN } from '@/shared/constants/cache-time';

export const useGetWishlistApi = () => {
	return useQuery({
		queryKey: [GET_WISHLIST],
		queryFn: () => getApiWish(),
		staleTime: CACHE_FIVE_MIN,
		retry: 2,
	});
};
