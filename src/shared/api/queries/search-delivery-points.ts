import { useQuery } from '@tanstack/react-query';
import { SEARCH_DELIVERY_POINTS } from '../query-keys/delivery-point';
import { getApiDeliverySearch } from '../generated';
import { CACHE_FIVE_MIN } from '@/shared/constants/cache-time';

export const useSearchDeliveryPoints = (
	withFitting?: boolean,
	searchText?: string
) => {
	const withFittingKey = withFitting ? withFitting.toString() : '';
	const searchTextKey = searchText ? searchText : '';

	return useQuery({
		queryKey: [SEARCH_DELIVERY_POINTS, withFittingKey, searchTextKey],
		queryFn: () =>
			getApiDeliverySearch({
				search_text: searchText,
				with_fitting: withFitting,
			}),
		staleTime: CACHE_FIVE_MIN,
	});
};
