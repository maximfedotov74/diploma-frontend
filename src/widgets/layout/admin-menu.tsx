import {
	ADMIN_ACTIONS_ROUTE,
	ADMIN_BRAND_ROUTE,
	ADMIN_CATEGORY_ROUTE,
	ADMIN_CHARACTERISTICS_ROUTE,
	ADMIN_DELIVERY_ROUTE,
	ADMIN_FEEDBACK_ROUTE,
	ADMIN_ORDERS_ROUTE,
	ADMIN_PRODUCTS_ROUTE,
	ADMIN_ROLES_ROUTE,
	ADMIN_STATISTICS_ROUTE,
	ADMIN_USERS_ROUTE,
} from '@/shared/constants/routes/admin';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { Link } from '@/shared/ui/link';
import { Logo } from '@/shared/ui/logo';
import { Sheet, SheetContent, SheetTrigger } from '@/shared/ui/sheet';
import { cn } from '@/shared/utils/cn';
import { useRouter } from 'next/router';

const adminMenu = [
	{
		title: 'Статистика',
		href: ADMIN_STATISTICS_ROUTE,
	},
	{
		title: 'Заказы',
		href: ADMIN_ORDERS_ROUTE,
	},
	{
		title: 'Товары',
		href: ADMIN_PRODUCTS_ROUTE,
	},
	{
		title: 'Характеристики',
		href: ADMIN_CHARACTERISTICS_ROUTE,
	},
	{
		title: 'Клиенты',
		href: ADMIN_USERS_ROUTE,
	},
	{
		title: 'Роли',
		href: ADMIN_ROLES_ROUTE,
	},
	{
		title: 'Категории',
		href: ADMIN_CATEGORY_ROUTE,
	},
	{
		title: 'Бренды',
		href: ADMIN_BRAND_ROUTE,
	},
	{
		title: 'Акции',
		href: ADMIN_ACTIONS_ROUTE,
	},
	{
		title: 'Пункты выдачи',
		href: ADMIN_DELIVERY_ROUTE,
	},
	{
		title: 'Отзывы',
		href: ADMIN_FEEDBACK_ROUTE,
	},
];

export const AdminMenu = (): JSX.Element => {
	const { asPath } = useRouter();

	return (
		<div className='relative'>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant='ghost' size='icon'>
						<Icon icon='menu_outline_24' className='w-6 h-6' />
					</Button>
				</SheetTrigger>
				<SheetContent side='left' className='px-1 sm:px-3 py-3' closeBtn>
					<div className='text-lg mb-4'>Панель администратора</div>
					<ul>
						{adminMenu.map(item => (
							<li key={item.href} className={'mb-2 last:mb-0'}>
								<Link
									variant='secondary'
									className={cn('text-base', {
										'text-foreground underline': asPath.startsWith(item.href),
									})}
									href={item.href}
								>
									{item.title}
								</Link>
							</li>
						))}
					</ul>
				</SheetContent>
			</Sheet>
			<Logo
				className='sm:absolute sm:top-1/2 sm:-translate-x-2/3 sm:-translate-y-1/2 sm:left-1/2 mb-3 sm:mb-0 italic'
				href={ADMIN_PRODUCTS_ROUTE}
			/>
		</div>
	);
};
