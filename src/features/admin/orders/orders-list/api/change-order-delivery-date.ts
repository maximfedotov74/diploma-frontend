import {
	ModelOrderStatusEnum,
	patchApiOrderChangeDeliveryDateOrderId,
} from '@/shared/api/generated';
import {
	CHANGE_ORDER_DELIVERY_DATE,
	GET_ALL_ORDERS,
} from '@/shared/api/query-keys/order';
import { useToast } from '@/shared/ui/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useChangeOrderDeliveryDate = (orderId: string) => {
	const qc = useQueryClient();
	const { toast } = useToast();
	const { mutateAsync: changeDeliveryDate } = useMutation({
		mutationKey: [CHANGE_ORDER_DELIVERY_DATE],
		mutationFn: (date: string) =>
			patchApiOrderChangeDeliveryDateOrderId(orderId, { date }),
		onSuccess: () => {
			qc.invalidateQueries({
				queryKey: [GET_ALL_ORDERS],
			});
			toast({
				title: 'Дата доставки заказа успешно обновлена!',
				duration: 3000,
			});
		},
	});
	return changeDeliveryDate;
};
