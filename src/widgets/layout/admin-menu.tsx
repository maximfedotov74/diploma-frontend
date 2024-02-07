import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { Link } from '@/shared/ui/link';
import { Sheet, SheetContent, SheetTrigger } from '@/shared/ui/sheet';
import { cn } from '@/shared/utils/cn';
import { useRouter } from 'next/router';

const adminMenu = [
	{
		title: 'Статистика',
		href: '/admin',
	},
	{
		title: 'Заказы',
		href: '/admin/orders',
	},
	{
		title: 'Товары',
		href: '/admin/products',
	},
	{
		title: 'Клиенты',
		href: '/admin/users',
	},
	{
		title: 'Категории',
		href: '/admin/categories',
	},
	{
		title: 'Бренды',
		href: '/admin/brands',
	},
];

export const AdminMenu = (): JSX.Element => {
	const { pathname, asPath } = useRouter();

	return (
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
									'text-foreground underline': item.href === asPath,
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
	);
};
