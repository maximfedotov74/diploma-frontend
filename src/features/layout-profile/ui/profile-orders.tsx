import { useGetMyFeedback } from '@/features/lk/feedback/api/get-my-feedback';
import { useGetUserOrdersApi } from '@/shared/api/queries/get-user-orders';
import {
	LK_ORDERS_ROUTE,
	LK_REVIEWS_ROUTE,
} from '@/shared/constants/routes/public';
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu';
import { Link } from '@/shared/ui/link';
import { TypographySmall } from '@/shared/ui/typography';

export const ProfileOrders = (): JSX.Element => {
	const { data: orders } = useGetUserOrdersApi();
	const { data: reviews } = useGetMyFeedback();
	return (
		<div>
			<DropdownMenuItem className='px-2 py-1.5'>
				<Link
					variant='menu'
					href={LK_ORDERS_ROUTE}
					className='w-full flex items-center'
				>
					<TypographySmall>Заказы</TypographySmall>
					<TypographySmall className='ml-auto'>
						{orders?.length}
					</TypographySmall>
				</Link>
			</DropdownMenuItem>
			<DropdownMenuItem className='px-2 py-1.5'>
				<Link
					variant='menu'
					href={LK_REVIEWS_ROUTE}
					className='w-full flex items-center'
				>
					<TypographySmall>Отзывы</TypographySmall>
					<TypographySmall className='ml-auto'>
						{reviews?.length}
					</TypographySmall>
				</Link>
			</DropdownMenuItem>
		</div>
	);
};
