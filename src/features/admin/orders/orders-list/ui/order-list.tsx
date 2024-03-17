import { ModelOrder } from '@/shared/api/generated';
import { OrderItem } from '@/shared/ui/order-item';
import { OrderItemSkeleton } from '@/shared/ui/order-item-skeleton';
import { TypographyH1 } from '@/shared/ui/typography';

export const OrderList = ({
	orders,
	isLoading,
}: {
	orders?: ModelOrder[];
	isLoading: boolean;
}): JSX.Element => {
	return (
		<div>
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
							className='mb-6 last:mb-0'
							order={order}
							forAdmin
						/>
					))}
				</div>
			) : (
				<div className='text-xl font-normal'>Заказов нет!</div>
			)}
		</div>
	);
};
