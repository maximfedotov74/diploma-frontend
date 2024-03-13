import { useGetCartApi } from '@/shared/api/queries/get-cart-api';
import { useGetWishlistApi } from '@/shared/api/queries/get-wishlist';
import { CART_ROUTE, WISHLIST_ROUTE } from '@/shared/constants/routes/public';
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu';
import { Link } from '@/shared/ui/link';
import { TypographySmall } from '@/shared/ui/typography';

export const ProfileWish = (): JSX.Element => {
	const { data: wishlist } = useGetWishlistApi();

	const { data: cart } = useGetCartApi();

	return (
		<div>
			<DropdownMenuItem>
				<Link
					variant='menu'
					href={CART_ROUTE}
					className='w-full flex items-center'
				>
					<TypographySmall>Корзина</TypographySmall>
					<TypographySmall className='ml-auto'>{cart?.length}</TypographySmall>
				</Link>
			</DropdownMenuItem>
			<DropdownMenuItem className='px-2 py-1.5'>
				<Link
					variant='menu'
					href={WISHLIST_ROUTE}
					className='w-full flex items-center'
				>
					<TypographySmall>Избранное</TypographySmall>
					<TypographySmall className='ml-auto'>
						{wishlist?.length}
					</TypographySmall>
				</Link>
			</DropdownMenuItem>
		</div>
	);
};
