import { useQuery } from '@tanstack/react-query';
import { getApiUserProfile } from '../generated';
import { USER_PROFILE } from '../query-keys/user';

export const useGetProfileApi = () => {
	return useQuery({
		queryKey: [USER_PROFILE],
		queryFn: () => getApiUserProfile(),
	});
};
