import { deleteApiDeliveryId } from '@/shared/api/generated';
import {
	DELETE_DELIVERY_POINT,
	SEARCH_DELIVERY_POINTS,
} from '@/shared/api/query-keys/delivery-point';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteDeliveryPointApi = () => {
	const queryCLient = useQueryClient();

	const { mutateAsync: deleteDeliveryPoint } = useMutation({
		mutationKey: [DELETE_DELIVERY_POINT],
		mutationFn: (id: number) => deleteApiDeliveryId(id),
		onSuccess: () => {
			queryCLient.invalidateQueries({ queryKey: [SEARCH_DELIVERY_POINTS] });
		},
	});
	return deleteDeliveryPoint;
};
