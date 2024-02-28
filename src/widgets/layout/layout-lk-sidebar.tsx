import {
	LK_ORDERS_ROUTE,
	LK_REVIEWS_ROUTE,
	LK_ROUTE,
} from '@/shared/constants/routes/public';
import { Link } from '@/shared/ui/link';
import { cn } from '@/shared/utils/cn';

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
];

export const LayoutLkSidebar = ({
	className,
}: {
	className?: string;
}): JSX.Element => {
	return (
		<aside className={cn(className)}>
			<nav>
				<ul>
					{userMenu.map(item => (
						<li key={item.href}>
							<Link variant='menu' href={item.href}>
								{item.title}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
};
