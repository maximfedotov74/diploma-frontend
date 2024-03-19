import Image from 'next/image';
import { ModelOrder } from '../api/generated';
import { LK_ORDERS_ROUTE } from '../constants/routes/public';
import { orderConditionsTranslate, orderStatusTranslate } from '../translation';
import { cn } from '../utils/cn';
import { parsePriceRUB } from '../utils/parse-price';
import { Link } from './link';
import { ADMIN_PRODUCTS_ROUTE } from '../constants/routes/admin';
import { ChangeStatus } from '@/features/admin/orders/orders-list/ui/change-status';
import { ChangeDeliveryDate } from '@/features/admin/orders/orders-list/ui/change-delivery-date';

export const OrderItem = ({
	order,
	className,
	forAdmin,
}: {
	order: ModelOrder;
	className?: string;
	forAdmin?: boolean;
}): JSX.Element => {
	return (
		<div key={order.order_id} className={cn('relative', className)}>
			<div className='mb-1'>
				Заказ {order.order_id} на сумму {parsePriceRUB(order.total_price)}
			</div>
			<div className='mb-1'>
				{new Date(order.created_at).toLocaleString('RU-ru', {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
					minute: 'numeric',
					hour: 'numeric',
				})}
			</div>

			{!forAdmin && order.delivery_date && (
				<div className='mb-1'>
					{`Дата доставки: ${new Date(order.delivery_date).toLocaleString(
						'RU-ru',
						{
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						}
					)}`}
				</div>
			)}

			{forAdmin ? (
				<ChangeStatus currentStatus={order.status} orderId={order.order_id} />
			) : (
				<div className={cn('mb-1', orderStatusTranslate[order.status].style)}>
					{orderStatusTranslate[order.status].title}
				</div>
			)}

			{forAdmin && (
				<ChangeDeliveryDate
					deliveryDate={order.delivery_date}
					orderId={order.order_id}
				/>
			)}

			{forAdmin && (
				<>
					<div className='mb-1'>
						Имя заказчика: {order.user.recipient_firstname}
					</div>
					<div className='mb-1'>
						Фамилия заказчика: {order.user.recipient_lastname}
					</div>
					<div className='mb-1'>
						Email заказчика: {order.user.recipient_email}
					</div>
					<div className='mb-1'>
						Телефон заказчика: {order.user.recipient_phone}
					</div>
					<div className='mb-1'>
						Скидка: {parsePriceRUB(order.total_discount ?? 0)}
					</div>
					<div className='mb-1'>
						Цена товаров: {parsePriceRUB(order.products_price)}
					</div>
					<div className='mb-1'>
						Сумма заказа: {parsePriceRUB(order.total_price)}
					</div>
					<div className='mb-1'>
						Доставка: {parsePriceRUB(order.delivery_price)}
					</div>
					<div className='mb-1'>
						Адрес пунтка выдачи: {order.delivery_point.address}
					</div>
					<div className='mb-1'>
						Возможность примерки: {orderConditionsTranslate[order.conditions]}
					</div>
				</>
			)}

			<div className='flex items-center'>
				{order.models.map(m => {
					if (!forAdmin) {
						return (
							<Link
								key={m.slug}
								href={`${LK_ORDERS_ROUTE}/${order.order_id}`}
								className='block h-[105px] w-[75px] mr-3 last:mr-0 relative'
							>
								<Image
									className='w-full h-[105px]'
									src={m.main_image_path}
									alt={m.article}
									width={75}
									height={105}
								/>
								<div className='bg-slate-400 text-xs w-2/3 absolute bottom-0 left-0'>
									{m.quantity} шт.
								</div>
							</Link>
						);
					}
					return (
						<Link
							href={`${ADMIN_PRODUCTS_ROUTE}?opened=${m.model_id}`}
							key={m.slug}
							className='block h-[105px] w-[75px] mr-3 last:mr-0 relative'
						>
							<Image
								className='w-full h-[105px]'
								src={m.main_image_path}
								alt={m.article}
								width={75}
								height={105}
							/>
							<div className='bg-slate-400 text-xs w-2/3 absolute bottom-0 left-0'>
								{m.quantity} шт.
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};
