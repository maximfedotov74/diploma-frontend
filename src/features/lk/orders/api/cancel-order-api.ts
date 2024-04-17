import { patchApiOrderCancelOrderId } from '@/shared/api/generated';
import { CANCEL_ORDER, GET_ORDER } from '@/shared/api/query-keys/order';
import { useToast } from '@/shared/ui/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCancelOrderApi = (orderId: string = '') => {
	const { toast } = useToast();
	const orderKey = orderId === '' ? '' : orderId;
	const qc = useQueryClient();
	const { mutateAsync: cancelOrder } = useMutation({
		mutationKey: [CANCEL_ORDER],
		mutationFn: (id: string) => patchApiOrderCancelOrderId(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [GET_ORDER, orderKey] });
			toast({
				title:
					'Заказ отменен успешно! Если вы оплатили его онлайн, то средства будут возвращены в ближайшее время!',
			});
		},
	});
	return cancelOrder;
};
