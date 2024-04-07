import { getApiFeedbackAdminUserUserId } from '@/shared/api/generated';
import { GET_ADMIN_USER_FEEDBACK } from '@/shared/api/query-keys/feedback';
import { CACHE_FIVE_MIN } from '@/shared/constants/cache-time';
import { useQuery } from '@tanstack/react-query';

export const useGetAdminUserFeedback = (userId: number) => {
	return useQuery({
		queryKey: [GET_ADMIN_USER_FEEDBACK, userId],
		queryFn: () => getApiFeedbackAdminUserUserId(userId),
		staleTime: CACHE_FIVE_MIN,
	});
};
