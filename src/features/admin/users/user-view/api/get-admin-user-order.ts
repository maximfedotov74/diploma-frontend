import { getApiOrderAdminUserUserId } from '@/shared/api/generated';
import { GET_ADMIN_USER_ORDERS } from '@/shared/api/query-keys/order';
import { CACHE_FIVE_MIN } from '@/shared/constants/cache-time';
import { useQuery } from '@tanstack/react-query';

export const useGetAdminUserOrders = (userId: number) => {
	return useQuery({
		queryKey: [GET_ADMIN_USER_ORDERS, userId],
		queryFn: () => getApiOrderAdminUserUserId(userId),
		staleTime: CACHE_FIVE_MIN,
	});
};
