import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { Logo } from '@/shared/ui/logo';
import { FC } from 'react';
import { UserNavigation } from './user-navigation';
import { MobileMenu } from './mobile-menu/mobile-menu';
import { MobileSearch } from './mobile-search';
import { GenderMenu } from './gender-menu';
import { CategoriesMenu } from '@/layout/types/categories-menu';

//MOCK
const sex = [
	{
		id: 1,
		short_title: 'Мужчинам',
		title: 'Мужская одежда, обувь и аксессуары',
		slug: 'men',
	},
	{
		id: 2,
		short_title: 'Женщинам',
		title: 'Женская одежда, обувь и аксессуары',
		slug: 'women',
	},
	{
		id: 3,
		short_title: 'Детям',
		title: 'Детская одежда, обувь и аксессуары',
		slug: 'children',
	},
];

const items: CategoriesMenu[] = [
	{
		title: 'Одежда',
		id: 1,
		sub: [
			{ title: 'Верхняя одежда', id: 11234 },
			{ title: 'Блузы и рубашки', id: 1111 },
			{ title: 'Брюки', id: 5656 },
			{ title: 'Джемперы, свитеры и кардиганы', id: 6699694 },
			{ title: 'Джинсы', id: 6699695 },
			{ title: 'Домашняя одежда', id: 6699696 },
			{ title: 'Майки', id: 6699697 },
		],
	},
	{
		title: 'Обувь',
		id: 2,
		sub: [
			{ title: 'Балетки', id: 10 },
			{ title: 'Батильоны', id: 123 },
			{ title: 'Ботинки', id: 444 },
			{ title: 'Сандали', id: 4445 },
			{ title: 'Сапоги', id: 4446 },
			{ title: 'Туфли', id: 4447 },
		],
	},
	{
		title: 'Спорт',
		id: 3,
		sub: [
			{ title: 'Баскетбол', id: 6667 },
			{ title: 'Бег', id: 6668 },
			{ title: 'Велоспорт', id: 6669 },
			{ title: 'Волейбол', id: 6610 },
			{ title: 'Плавание', id: 6611 },
			{ title: 'Теннис', id: 6612 },
		],
	},
];

export const PublicHeaderMiddle: FC = (): JSX.Element => {
	return (
		<>
			<nav className='lg:block hidden'>
				<GenderMenu items={sex} />
			</nav>
			<div className='lg:hidden block'>
				<div className='flex items-center'>
					<MobileMenu genderMenu={sex} categoriesMenu={items} />
					<MobileSearch />
				</div>
			</div>
			<div className='lg:hidden block'></div>
			<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
				<Logo />
			</div>
			<UserNavigation />
		</>
	);
};
