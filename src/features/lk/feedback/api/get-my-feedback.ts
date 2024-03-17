import { getApiFeedbackMy } from '@/shared/api/generated';
import { GET_MY_FEEDBACK } from '@/shared/api/query-keys/feedback';
import { CACHE_FIVE_MIN } from '@/shared/constants/cache-time';
import { useQuery } from '@tanstack/react-query';

export const useGetMyFeedback = () => {
	return useQuery({
		queryKey: [GET_MY_FEEDBACK],
		queryFn: () => getApiFeedbackMy(),
		staleTime: CACHE_FIVE_MIN,
	});
};
