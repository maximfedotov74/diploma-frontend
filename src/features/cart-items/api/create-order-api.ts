import { ModelCreateOrderDto, postApiOrder } from '@/shared/api/generated';
import { CREATE_ORDER } from '@/shared/api/query-keys/order';
import { GET_CART } from '@/shared/api/query-keys/wishlist';
import { useToast } from '@/shared/ui/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export const useCreateOrderApi = (setCheckoutHidden: () => void) => {
	const router = useRouter();
	const { toast } = useToast();
	const qc = useQueryClient();
	const { mutateAsync: createOrder } = useMutation({
		mutationKey: [CREATE_ORDER],
		mutationFn: (dto: ModelCreateOrderDto) => postApiOrder(dto),
		onSuccess: d => {
			if (d.payment_url) {
				router.push(d.payment_url);
				return;
			} else {
				qc.invalidateQueries({ queryKey: [GET_CART] });
				setCheckoutHidden();
				toast({
					title:
						'Заказ оформлен успешно, можете подтвердить его на электронной почте!',
				});
			}
		},
	});
	return createOrder;
};
