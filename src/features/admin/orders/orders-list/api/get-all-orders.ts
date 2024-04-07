import { getApiOrderAdminAll } from '@/shared/api/generated';
import { GET_ALL_ORDERS } from '@/shared/api/query-keys/order';
import { useQuery } from '@tanstack/react-query';

export const useGetAllOrders = (page: number, from?: string, to?: string) => {
	const fromKey = from ? from : '';
	const toKey = to ? to : '';

	return useQuery({
		queryKey: [GET_ALL_ORDERS, page, fromKey, toKey],
		queryFn: () =>
			getApiOrderAdminAll({
				fromDate: from ? from : '',
				toDate: to ? to : '',
				page: page,
			}),
	});
};
