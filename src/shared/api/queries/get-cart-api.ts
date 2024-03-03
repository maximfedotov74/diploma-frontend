import { useQuery } from '@tanstack/react-query';
import { getApiWishCart } from '../generated';
import { GET_CART } from '../query-keys/wishlist';
import { CACHE_FIVE_MIN } from '@/shared/constants/cache-time';

export const useGetCartApi = () => {
	return useQuery({
		queryKey: [GET_CART],
		queryFn: () => getApiWishCart(),
		staleTime: CACHE_FIVE_MIN,
		retry: 1,
		retryDelay: 1000,
	});
};
