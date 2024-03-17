import { useGetOrder } from '@/shared/api/queries/get-order';
import { LK_ORDERS_ROUTE } from '@/shared/constants/routes/public';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { Separator } from '@/shared/ui/separator';
import { TypographySmall } from '@/shared/ui/typography';
import { cn } from '@/shared/utils/cn';
import { parsePriceRUB } from '@/shared/utils/parse-price';
import { orderStatusTranslate } from '@/shared/translation';
import { useCancelOrderApi } from '../api/cancel-order-api';
import { OrderModelItem } from '@/shared/ui/model-order-item';

export const OrderPage = (): JSX.Element => {
	const router = useRouter();

	const orderId = router.query.orderId as string;

	const { data: order, isError, isLoading } = useGetOrder(orderId);

	const cancelOrder = useCancelOrderApi(order?.order_id);

	useEffect(() => {
		if (isError) {
			router.push('/404');
		}
	}, [isError, router]);

	const goBack = () => {
		router.push(LK_ORDERS_ROUTE);
	};
	return (
		<>
			{order && (
				<>
					<div className='mb-5'>
						<Button onClick={goBack} variant='outline'>
							<Icon icon='arrow_left_outline_24' className='mr-2' />
							<TypographySmall>Заказ {order.order_id}</TypographySmall>
						</Button>
					</div>

					<div
						className={cn(
							'mb-5 text-xl',
							orderStatusTranslate[order.status].style
						)}
					>
						{orderStatusTranslate[order.status].title}
					</div>

					<div className='mb-5'>
						{new Date(order.created_at).toLocaleString('RU-ru', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
							minute: 'numeric',
							hour: 'numeric',
						})}
					</div>

					<div className='flex items-center'>
						{order.models.map(m => (
							<OrderModelItem
								key={m.order_model_id}
								m={m}
								className='mr-3 last:mr-0'
							/>
						))}
					</div>
					<Separator className='my-5 w-full' />
					<div className='flex py-5 justify-between'>
						<div className='font-medium text-xl'>Детали оплаты</div>
						<div className='w-[320px]'>
							<div className='flex items-center justify-between'>
								<div className='text-foreground/60'>
									{order.models.reduce((acc, item) => item.quantity + acc, 0)}{' '}
									Товара на сумму
								</div>
								<div>{parsePriceRUB(order.products_price)}</div>
							</div>
							<div className='flex items-center justify-between'>
								<div className='text-foreground/60'>Скидка</div>
								<div>{parsePriceRUB(order.total_discount ?? 0)}</div>
							</div>
							<div className='flex items-center justify-between mb-4'>
								<div className='text-foreground/60'>Доставка</div>
								<div>{parsePriceRUB(order.delivery_price ?? 0)}</div>
							</div>
							<div className='flex items-center justify-between mb-4 text-xl'>
								<div>Итого</div>
								<div>{parsePriceRUB(order.total_price ?? 0)}</div>
							</div>
						</div>
					</div>
					<Separator className='my-5 w-full' />
					<div className='flex py-5 justify-between'>
						<div className='font-medium text-xl'>Детали доставки</div>
						<div className='w-[320px]'>
							<div className='mb-3'>
								<div className='mb-1'>{order.delivery_point.address}</div>
								<div className='text-sm text-foreground/60'>
									{order.delivery_point.work_schedule}
								</div>
							</div>
							<div className='mb-3'>
								<div className='mb-1'>
									{order.user.recipient_firstname}{' '}
									{order.user.recipient_lastname}
								</div>
								<div className='text-sm text-foreground/60'>
									{order.user.recipient_phone}
								</div>
							</div>
							{order.delivery_point.with_fitting && (
								<div className='text-sm mb-3'>
									Вы можете примерить товар перед покупкой
								</div>
							)}
							{order.status !== 'canceled' && order.status !== 'completed' && (
								<Button
									onClick={() => cancelOrder(order.order_id)}
									variant='outline'
								>
									Отменить заказ
								</Button>
							)}
						</div>
					</div>
				</>
			)}
		</>
	);
};
