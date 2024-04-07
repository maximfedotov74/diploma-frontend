import { OrderItem } from '@/shared/ui/order-item';
import { useGetAdminUserOrders } from '../api/get-admin-user-order';

export const UserOrders = ({ userId }: { userId: number }): JSX.Element => {
	const { data, isLoading } = useGetAdminUserOrders(userId);

	return (
		<div>
			<div className='text-xl mb-3'>Список заказов</div>

			{isLoading ? (
				<div className='text-lg'>Загрузка...</div>
			) : data?.length ? (
				<>
					<div className='text-xl mb-3'>Заказов: {data.length}</div>
					{data?.map(order => (
						<OrderItem
							order={order}
							key={order.order_id}
							forAdmin
							className='mb-6 last:mb-0'
						/>
					))}
				</>
			) : (
				<div className='text-lg'>Заказов нет!</div>
			)}
		</div>
	);
};
