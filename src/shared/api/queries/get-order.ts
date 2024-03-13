import { useQuery } from '@tanstack/react-query';
import { GET_ORDER } from '../query-keys/order';
import { getApiOrderOrderId } from '../generated';
import { CACHE_FIVE_MIN } from '@/shared/constants/cache-time';

export const useGetOrder = (orderId: string = '') => {
	const orderKey = orderId === '' ? '' : orderId;
	const enabled = orderId === '' ? false : true;
	return useQuery({
		queryKey: [GET_ORDER, orderKey],
		queryFn: () => getApiOrderOrderId(orderId),
		enabled: enabled,
		staleTime: CACHE_FIVE_MIN,
	});
};
