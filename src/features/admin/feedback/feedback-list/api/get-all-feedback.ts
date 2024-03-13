import { getApiFeedback } from '@/shared/api/generated';
import { GET_ALL_FEEDBACK } from '@/shared/api/query-keys/feedback';
import { CACHE_FIVE_MIN } from '@/shared/constants/cache-time';
import { useQuery } from '@tanstack/react-query';

export const useGetAllFeedback = (
	page: number,
	filter: string,
	order: string
) => {
	return useQuery({
		queryKey: [GET_ALL_FEEDBACK, page, filter, order],
		queryFn: () => getApiFeedback({ filter, order, page }),
		staleTime: CACHE_FIVE_MIN,
	});
};
