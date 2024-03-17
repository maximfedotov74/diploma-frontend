import { getApiProductModelByIdId } from '@/shared/api/generated';
import { GET_INITIAL_MODEL } from '@/shared/api/query-keys/product';
import { CACHE_FIVE_MIN } from '@/shared/constants/cache-time';
import { useQuery } from '@tanstack/react-query';

export const useGetModel = (id: number | undefined) => {
	const key = id ? id.toString() : '';
	const enabled = id ? true : false;

	return useQuery({
		queryKey: [GET_INITIAL_MODEL, key],
		queryFn: () => getApiProductModelByIdId(id ?? -1),
		enabled: enabled,
		staleTime: CACHE_FIVE_MIN,
	});
};
