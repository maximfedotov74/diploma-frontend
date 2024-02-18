import { useQuery } from '@tanstack/react-query';
import { getApiAction } from '../generated';
import { CACHE_FIVE_MIN } from '@/shared/constants/cache-time';
import { ALL_ACTIONS } from '../query-keys/action';

export const useGetAllActions = () => {
	return useQuery({
		queryKey: [ALL_ACTIONS],
		queryFn: () => getApiAction(),
		staleTime: CACHE_FIVE_MIN,
	});
};
