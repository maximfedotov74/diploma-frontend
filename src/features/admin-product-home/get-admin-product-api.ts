import { getApiProductAdmin } from '@/shared/api/generated';
import { ADMIN_PRODUCTS } from '@/shared/api/query-keys/product';
import { CACHE_FIVE_MIN } from '@/shared/constants/cache-time';
import { useQuery } from '@tanstack/react-query';

export const useGetAdminProductApi = (page: number) => {
	return useQuery({
		queryKey: [ADMIN_PRODUCTS, page],
		queryFn: () => getApiProductAdmin({ page: page }),
		staleTime: CACHE_FIVE_MIN,
	});
};
