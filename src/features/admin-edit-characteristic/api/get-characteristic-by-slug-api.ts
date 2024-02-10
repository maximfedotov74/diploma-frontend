import { getApiCharacteristicsOptionId } from '@/shared/api/generated';
import { CHARACTERISTICS_VALUES } from '@/shared/api/query-keys/characteristics';
import { CACHE_FIVE_MIN } from '@/shared/constants/cache-time';
import { useQuery } from '@tanstack/react-query';

export const useGetCharacteristic = (id: number) => {
	return useQuery({
		queryKey: [CHARACTERISTICS_VALUES, id],
		queryFn: () => getApiCharacteristicsOptionId(id),
		staleTime: CACHE_FIVE_MIN,
	});
};
