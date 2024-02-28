import {
	ModelUpdateDeliveryPointDto,
	patchApiDeliveryId,
} from '@/shared/api/generated';
import {
	EDIT_DELIVERY_POINT,
	SEARCH_DELIVERY_POINTS,
} from '@/shared/api/query-keys/delivery-point';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useEditDeliveryPointApi = () => {
	const queryCLient = useQueryClient();

	const { mutateAsync: editDeliveryPoint } = useMutation({
		mutationKey: [EDIT_DELIVERY_POINT],
		mutationFn: ({
			id,
			dto,
		}: {
			id: number;
			dto: ModelUpdateDeliveryPointDto;
		}) => patchApiDeliveryId(id, dto),
		onSuccess: () => {
			queryCLient.invalidateQueries({ queryKey: [SEARCH_DELIVERY_POINTS] });
		},
	});
	return editDeliveryPoint;
};
