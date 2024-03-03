import { useQuery } from '@tanstack/react-query';
import { getApiFeedbackModelModelId } from '../generated';
import { CACHE_FIVE_MIN } from '@/shared/constants/cache-time';
import { GET_MODEL_FEEDBACK } from '../query-keys/feedback';

export const useGetModelFeedbackApi = (id: number) => {
	return useQuery({
		queryKey: [GET_MODEL_FEEDBACK, id],
		queryFn: () => getApiFeedbackModelModelId(id),
		staleTime: CACHE_FIVE_MIN,
	});
};
