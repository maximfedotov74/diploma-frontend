import { Container } from '@/layout/container';
import { CategoriesMenu } from '@/layout/types/categories-menu';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { AppLink } from '@/shared/ui/link';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { FC, Fragment, useState } from 'react';

const items: CategoriesMenu[] = [
	{
		title: 'Одежда',
		id: 1,
		sub: [
			{ title: 'Верхняя одежда', id: 11234 },
			{ title: 'Блузы и рубашки', id: 1111 },
			{ title: 'Брюки', id: 5656 },
		],
	},
	{
		title: 'Обувь',
		id: 2,
		sub: [
			{ title: 'Балетки', id: 10 },
			{ title: 'Батильоны', id: 123 },
			{ title: 'Ботинки', id: 444 },
		],
	},
];

export const NavigationMenu: FC = (): JSX.Element => {
	const [active, setActive] = useState<CategoriesMenu | null>(null);

	const setActiveMenu = (menu: CategoriesMenu) => {
		if (active?.id === menu.id) {
			setActive(null);
		} else {
			setActive(menu);
		}
	};

	return (
		<div>
			<ul className='flex items-center'>
				{items.map(m => (
					<li key={m.id} className='mr-2 last:mr-0'>
						<Button
							variant='simple'
							className='transition-colors text-primary-color hover:text-light-gray-color'
							onClick={() => setActiveMenu(m)}
						>
							<li>{m.title}</li>
						</Button>
					</li>
				))}
			</ul>

			{active != null ? (
				<div className='absolute w-full min-h-[250px] top-8 left-0 right-0 bottom-0 bg-secondary-color shadow-xl z-[2]'>
					<Container>
						<div className='relative'>
							<ul className='flex flex-col items-start'>
								<li className='mb-2'>
									<AppLink className='text-xs font-bold' href='/'>
										Вся {active.title}
									</AppLink>
								</li>
								{active.sub.map(m => (
									<li key={m.id} className='last:mb-0 mb-2'>
										<AppLink className='text-xs' href='/'>
											{m.title}
										</AppLink>
									</li>
								))}
							</ul>
							<Button
								onClick={() => setActive(null)}
								variant='simple'
								className='absolute top-4 right-2'
							>
								<Icon className='w-6 h-6' icon='cancel_16' />
							</Button>
						</div>
					</Container>
				</div>
			) : null}
		</div>
	);
};
