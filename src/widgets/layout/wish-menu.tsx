import { Icon } from '@/shared/ui/icon';
import { Link } from '@/shared/ui/link';
import { TypographySmall } from '@/shared/ui/typography';

export const WishMenu = (): JSX.Element => {
	return (
		<div className='flex items-center ml-auto'>
			<Link
				variant='menu'
				href='/'
				className='flex items-center mr-2 hover:text-foreground/60 relative'
			>
				<Icon icon='like_outline_24' className='w-5 h-5' />
				<TypographySmall className='sm:inline-block hidden ml-1'>
					Избранное
				</TypographySmall>
				<div className='pointer-events-none  ml-1 min-w-[20px] min-h-[20px] bg-primary rounded-2xl text-secondary flex items-center justify-center text-center text-xs'>
					35
				</div>
			</Link>

			<Link
				variant='menu'
				href='/'
				className='flex items-center hover:text-foreground/60 relative'
			>
				<Icon icon='shopping_cart_outline_24' className='w-5 h-5' />
				<TypographySmall className='sm:inline-block hidden ml-1'>
					Корзина
				</TypographySmall>
				<div className='pointer-events-none ml-1  min-w-[20px] min-h-[20px] bg-primary rounded-2xl text-secondary flex items-center justify-center text-center text-xs'>
					31
				</div>
			</Link>
		</div>
	);
};
