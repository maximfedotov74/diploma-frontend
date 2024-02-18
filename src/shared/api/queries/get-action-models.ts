import { useQuery } from '@tanstack/react-query';
import { getApiActionModelId } from '../generated';
import { CACHE_FIVE_MIN } from '@/shared/constants/cache-time';
import { ACTION_MODELS } from '../query-keys/action';

export const useGetAllActionModels = (id: string) => {
	return useQuery({
		queryKey: [ACTION_MODELS, id],
		queryFn: () => getApiActionModelId(id),
		staleTime: CACHE_FIVE_MIN,
	});
};
