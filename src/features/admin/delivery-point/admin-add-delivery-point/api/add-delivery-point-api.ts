import {
	ModelCreateDeliveryPointDto,
	postApiDelivery,
} from '@/shared/api/generated';
import {
	ADD_DELIVERY_POINT,
	SEARCH_DELIVERY_POINTS,
} from '@/shared/api/query-keys/delivery-point';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddDeliverypointApi = () => {
	const queryCLient = useQueryClient();

	const { mutateAsync: createDeliveryPoint } = useMutation({
		mutationKey: [ADD_DELIVERY_POINT],
		mutationFn: (dto: ModelCreateDeliveryPointDto) => postApiDelivery(dto),
		onSuccess: () => {
			queryCLient.invalidateQueries({ queryKey: [SEARCH_DELIVERY_POINTS] });
		},
	});
	return createDeliveryPoint;
};
