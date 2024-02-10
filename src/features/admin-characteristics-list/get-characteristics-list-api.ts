import { getApiCharacteristicsOption } from '@/shared/api/generated';
import { ALL_CHARACTERISTICS } from '@/shared/api/query-keys/characteristics';
import { CACHE_FIVE_MIN } from '@/shared/constants/cache-time';
import { useQuery } from '@tanstack/react-query';

export const useGetAllCharacteristics = () => {
	return useQuery({
		queryKey: [ALL_CHARACTERISTICS],
		queryFn: () => getApiCharacteristicsOption(),
		staleTime: CACHE_FIVE_MIN,
	});
};
