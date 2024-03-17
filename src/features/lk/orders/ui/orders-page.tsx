import { TypographyH1 } from '@/shared/ui/typography';

import { useGetUserOrdersApi } from '@/shared/api/queries/get-user-orders';
import { OrderItem } from '@/shared/ui/order-item';
import { OrderItemSkeleton } from '@/shared/ui/order-item-skeleton';

export const OrdersPage = (): JSX.Element => {
	const { data: orders, isLoading } = useGetUserOrdersApi();

	return (
		<>
			<TypographyH1 className='text-2xl font-normal mb-10'>
				Заказы {orders?.length}
			</TypographyH1>
			<div className='mb-10'>
				{isLoading ? (
					<div>
						{Array.from({ length: 9 }).map((_, idx) => (
							<OrderItemSkeleton key={idx} />
						))}
					</div>
				) : orders && orders.length > 0 ? (
					<div>
						{orders.map(order => (
							<OrderItem
								key={order.order_id}
								className='mb-3 last:mb-0'
								order={order}
							/>
						))}
					</div>
				) : (
					<div className='text-xl font-normal'>
						У вас нет еще ни одного заказа!
					</div>
				)}
			</div>
		</>
	);
};
