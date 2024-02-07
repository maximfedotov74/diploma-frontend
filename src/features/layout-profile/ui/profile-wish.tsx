import { DropdownMenuItem } from '@/shared/ui/dropdown-menu';
import { Link } from '@/shared/ui/link';
import { TypographySmall } from '@/shared/ui/typography';

export const ProfileWish = (): JSX.Element => {
	return (
		<div>
			<DropdownMenuItem>
				<Link variant='menu' href='/' className='w-full flex items-center'>
					<TypographySmall>Корзина</TypographySmall>
					<TypographySmall className='ml-auto'>3</TypographySmall>
				</Link>
			</DropdownMenuItem>
			<DropdownMenuItem className='px-2 py-1.5'>
				<Link variant='menu' href='/' className='w-full flex items-center'>
					<TypographySmall>Избранное</TypographySmall>
					<TypographySmall className='ml-auto'>322</TypographySmall>
				</Link>
			</DropdownMenuItem>
		</div>
	);
};
