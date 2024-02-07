import { getApiProductAdminModelsProductId } from '@/shared/api/generated';
import { ADMIN_PRODUCTS_MODELS } from '@/shared/api/query-keys/product';
import { CACHE_FIVE_MIN } from '@/shared/constants/cache-time';
import { useQuery } from '@tanstack/react-query';

export const useGetAdminProductModelsApi = (id: number) => {
	return useQuery({
		queryKey: [ADMIN_PRODUCTS_MODELS, id],
		queryFn: () => getApiProductAdminModelsProductId(id),
		staleTime: CACHE_FIVE_MIN,
	});
};
