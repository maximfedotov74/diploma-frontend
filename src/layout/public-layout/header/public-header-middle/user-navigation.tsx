import { Icon } from '@/shared/ui/icon';
import { AppLink } from '@/shared/ui/link';
import { FC } from 'react';

export const UserNavigation: FC = (): JSX.Element => {
	return (
		<div className='flex items-center'>
			<AppLink href='/login' className='md:mr-5 mr-3 hidden lg:block'>
				<span className='text-[13px]'>Войти</span>
			</AppLink>
			<AppLink href='/' className='md:mr-5 mr-3'>
				<Icon
					icon='shopping_cart_outline_24'
					className='w-6 h-6 md:h-8 md:w-8'
				/>
				<span className='text-[13px] hidden ml-1 lg:block'>Корзина</span>
			</AppLink>
			<AppLink href='/'>
				<Icon icon='like_outline_24' className='w-6 h-6 md:h-8 md:w-8' />
				<span className='text-[13px] hidden  ml-1 lg:block'>Избранное</span>
			</AppLink>
		</div>
	);
};
