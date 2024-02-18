import { getApiCharacteristicsSize } from '@/shared/api/generated';
import { ALL_SIZES } from '@/shared/api/query-keys/characteristics';
import { CACHE_FIVE_MIN } from '@/shared/constants/cache-time';
import { useQuery } from '@tanstack/react-query';

export const useGetAllSizes = () => {
	return useQuery({
		queryKey: [ALL_SIZES],
		queryFn: () => getApiCharacteristicsSize(),
		staleTime: CACHE_FIVE_MIN,
	});
};
