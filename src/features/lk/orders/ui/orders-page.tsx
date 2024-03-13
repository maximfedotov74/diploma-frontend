import Image from 'next/image';
import { Link } from '@/shared/ui/link';
import { Skeleton } from '@/shared/ui/skeleton';
import { TypographyH1 } from '@/shared/ui/typography';
import { cn } from '@/shared/utils/cn';
import { parsePriceRUB } from '@/shared/utils/parse-price';
import { orderStatusTranslate } from '@/shared/translation';
import {
	LK_ORDERS_ROUTE,
	PRODUCT_ROUTE,
} from '@/shared/constants/routes/public';
import { useGetUserOrdersApi } from '@/shared/api/queries/get-user-orders';

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
							<div key={idx} className='mb-3 last:mb-0'>
								<Skeleton className='h-6 mb-1' />
								<Skeleton className='h-6 mb-1' />
								<div className='flex items-center'>
									{Array.from({ length: 3 }).map((_, idx) => (
										<Skeleton
											key={idx}
											className='h-[105px] w-[75px] mr-3 last:mr-0'
										/>
									))}
								</div>
							</div>
						))}
					</div>
				) : orders && orders.length > 0 ? (
					<div>
						{orders.map(order => (
							<div key={order.order_id} className='mb-3 last:mb-0'>
								<div className='mb-1'>
									Заказ {order.order_id} на сумму{' '}
									{parsePriceRUB(order.total_price)}
								</div>
								<div
									className={cn(
										'mb-1',
										orderStatusTranslate[order.status].style
									)}
								>
									{orderStatusTranslate[order.status].title}
								</div>
								<div className='flex items-center'>
									{order.models.map(m => (
										<Link
											key={m.slug}
											href={`${LK_ORDERS_ROUTE}/${order.order_id}`}
											className='block h-[105px] w-[75px] mr-3 last:mr-0'
										>
											<Image
												className='w-full h-[105px]'
												src={m.main_image_path}
												alt={m.article}
												width={75}
												height={105}
											/>
										</Link>
									))}
								</div>
							</div>
						))}
					</div>
				) : (
					<TypographyH1>У вас нет еще ни одного заказа!</TypographyH1>
				)}
			</div>
		</>
	);
};
