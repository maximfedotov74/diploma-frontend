import { FC, PropsWithChildren } from 'react';
import { Container } from '../container';
import { AppLink } from '@/shared/ui/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

const links = [
	{ id: 1, title: 'Статистика', link: '/admin/home' },
	{ id: 2, title: 'Товары', link: '/admin/products' },
	{ id: 3, title: 'Категории', link: '/admin/categories' },
	{ id: 4, title: 'Бренды', link: '/admin/brands' },
	{ id: 5, title: 'Акции', link: '/admin/offers' },
	{ id: 6, title: 'Пользователи', link: '/admin/users' },
	{ id: 7, title: 'Заказы', link: '/admin/orders' },
];

export const AdminLayout: FC<PropsWithChildren> = ({
	children,
}): JSX.Element => {
	const { asPath } = useRouter();

	return (
		<>
			<header>
				<Container>
					<nav className='py-5'>
						<ul className='flex items-center justify-center'>
							{links.map(l => (
								<li key={l.id} className='mr-2 last:mr-0'>
									<AppLink
										className={clsx({
											'font-bold': l.link === asPath,
										})}
										href={l.link}
									>
										{l.title}
									</AppLink>
								</li>
							))}
						</ul>
					</nav>
				</Container>
			</header>
			<main>
				<Container>{children}</Container>
			</main>
			<footer>admin footer</footer>
		</>
	);
};
