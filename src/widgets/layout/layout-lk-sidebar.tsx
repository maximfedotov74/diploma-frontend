import {
	LK_ORDERS_ROUTE,
	LK_REVIEWS_ROUTE,
	LK_ROUTE,
	LK_SESSIONS,
} from '@/shared/constants/routes/public';
import { Link } from '@/shared/ui/link';
import { cn } from '@/shared/utils/cn';
import { useRouter } from 'next/router';

const userMenu = [
	{
		title: 'Мои заказы',
		href: LK_ORDERS_ROUTE,
	},
	{
		title: 'Мои отзывы',
		href: LK_REVIEWS_ROUTE,
	},
	{
		title: 'Мои данные',
		href: LK_ROUTE,
	},
	{
		title: 'История активности',
		href: LK_SESSIONS,
	},
];

export const LayoutLkSidebar = ({
	className,
}: {
	className?: string;
}): JSX.Element => {
	const { pathname } = useRouter();

	return (
		<aside className={cn(className)}>
			<nav>
				<ul>
					{userMenu.map(item => (
						<li key={item.href}>
							<Link
								href={item.href}
								variant='menu'
								className={cn({
									'underline font-bold': pathname === item.href,
								})}
							>
								{item.title}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
};
