import {
	GetApiProductAdminParams,
	getApiProductAdmin,
} from '@/shared/api/generated';
import { ADMIN_PRODUCTS } from '@/shared/api/query-keys/product';
import { CACHE_FIVE_MIN } from '@/shared/constants/cache-time';
import { useQuery } from '@tanstack/react-query';

export const useGetAdminProductApi = (
	page: number,
	categoryId?: number,
	brandId?: number
) => {
	const categoryKey = categoryId ? categoryId.toString() : '';
	const brandKey = brandId ? brandId.toString() : '';

	const data: GetApiProductAdminParams = { page: page };

	if (categoryId) {
		data.categoryId = categoryId;
	}

	if (brandId) {
		data.brandId = brandId;
	}

	return useQuery({
		queryKey: [ADMIN_PRODUCTS, page, categoryKey, brandKey],
		queryFn: () => getApiProductAdmin(data),
		staleTime: CACHE_FIVE_MIN,
	});
};
