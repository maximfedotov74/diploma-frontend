import { getApiRole } from '@/shared/api/generated';
import { GET_ALL_ROLES } from '@/shared/api/query-keys/role';
import { useQuery } from '@tanstack/react-query';

export const useGetAllRoles = () => {
	return useQuery({
		queryKey: [GET_ALL_ROLES],
		queryFn: () => getApiRole(),
	});
};
