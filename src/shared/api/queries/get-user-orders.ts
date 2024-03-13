import { useQuery } from '@tanstack/react-query';
import { getApiOrderMy } from '../generated';
import { CACHE_FIVE_MIN } from '@/shared/constants/cache-time';
import { GET_USER_ORDERS } from '../query-keys/order';

export const useGetUserOrdersApi = () => {
	return useQuery({
		queryKey: [GET_USER_ORDERS],
		queryFn: () => getApiOrderMy(),
		staleTime: CACHE_FIVE_MIN,
		retry: 1,
		retryDelay: 1000,
	});
};
