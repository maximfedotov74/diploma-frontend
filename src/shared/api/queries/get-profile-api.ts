import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getApiUserProfile } from '../generated';
import { USER_PROFILE } from '../query-keys/user';
import { useEffect } from 'react';

export const useGetProfileApi = () => {
	const queryClinet = useQueryClient();
	const { data, isLoading, isError } = useQuery({
		queryKey: [USER_PROFILE],
		queryFn: () => getApiUserProfile(),
	});

	return {
		data,
		isLoading,
		isError,
	};
};
