import {
	ModelOrderStatusEnum,
	patchApiOrderChangeStatusOrderId,
} from '@/shared/api/generated';
import {
	CHANGE_ORDER_STATUS,
	GET_ALL_ORDERS,
} from '@/shared/api/query-keys/order';
import { useToast } from '@/shared/ui/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useChangeOrderStatus = (orderId: string) => {
	const qc = useQueryClient();
	const { toast } = useToast();
	const { mutateAsync: changeStatus } = useMutation({
		mutationKey: [CHANGE_ORDER_STATUS],
		mutationFn: (status: ModelOrderStatusEnum) =>
			patchApiOrderChangeStatusOrderId(orderId, {
				status: status,
			}),
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [GET_ALL_ORDERS],
			});
			toast({ title: 'Статус заказа успешно обновлен!', duration: 3000 });
		},
	});
	return changeStatus;
};
