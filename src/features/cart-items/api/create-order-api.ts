import { ModelCreateOrderDto, postApiOrder } from '@/shared/api/generated';
import { CREATE_ORDER } from '@/shared/api/query-keys/order';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export const useCreateOrderApi = () => {
	const router = useRouter();
	const { mutateAsync: createOrder } = useMutation({
		mutationKey: [CREATE_ORDER],
		mutationFn: (dto: ModelCreateOrderDto) => postApiOrder(dto),
		onSuccess: d => {
			if (d.payment_url) {
				router.push(d.payment_url);
			}
		},
	});
	return createOrder;
};
