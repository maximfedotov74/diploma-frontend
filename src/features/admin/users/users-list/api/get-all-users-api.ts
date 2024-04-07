import { getApiUserAll } from '@/shared/api/generated';
import { GET_ALL_USERS } from '@/shared/api/query-keys/user';
import { CACHE_FIVE_MIN } from '@/shared/constants/cache-time';
import { useQuery } from '@tanstack/react-query';

export const useGetAllUsersApi = (page: number) => {
	return useQuery({
		queryKey: [GET_ALL_USERS, page],
		queryFn: () => getApiUserAll({ page }),
		staleTime: CACHE_FIVE_MIN,
	});
};
