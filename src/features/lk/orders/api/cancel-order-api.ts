import { patchApiOrderCancelOrderId } from '@/shared/api/generated';
import { CANCEL_ORDER, GET_ORDER } from '@/shared/api/query-keys/order';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCancelOrderApi = (orderId: string = '') => {
	const orderKey = orderId === '' ? '' : orderId;

	const qc = useQueryClient();
	const { mutateAsync: cancelOrder } = useMutation({
		mutationKey: [CANCEL_ORDER],
		mutationFn: (id: string) => patchApiOrderCancelOrderId(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [GET_ORDER, orderKey] });
		},
	});
	return cancelOrder;
};
