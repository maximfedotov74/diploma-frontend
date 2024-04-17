import {
	ModelAction,
	ModelActionGender,
	ModelBrand,
	ModelCategoryModel,
	ModelCategoryRelation,
} from '@/shared/api/generated';

import { WidthContainer } from '@/shared/ui/width-container';
import { ReactNode } from 'react';
import { Logo } from '@/shared/ui/logo';
import { TopHeader } from './top-header';
import { GenderMenu } from './gender-menu';
import { HoverMenu } from './hover-menu';
import { Footer } from './footer';
import { MobileMenu } from './mobile-menu';
import { Search } from '@/features/search/search';

type LayoutProps = {
	children: ReactNode;
	topLevels: ModelCategoryModel[];
	menu: ModelCategoryRelation;
	genderMenu: ModelActionGender;
	brands: ModelBrand[];
};

export const Layout = ({
	children,
	topLevels,
	menu,
	genderMenu,
	brands,
}: LayoutProps): JSX.Element => {
	return (
		<>
			<header>
				<WidthContainer>
					<TopHeader />
					<div className='flex flex-col sm:flex-row items-center relative mt-3'>
						<Logo className='sm:absolute sm:top-1/2 sm:-translate-x-2/3 sm:-translate-y-1/2 sm:left-1/2 mb-3 sm:mb-0 italic' />
						<div className='flex items-center w-full'>
							<GenderMenu
								topLevels={topLevels}
								className='md:block hidden'
								currentMenu={genderMenu}
							/>
							<MobileMenu
								menu={menu}
								topLevels={topLevels}
								currentMenu={genderMenu}
								brands={brands}
							/>
							<Search
								className='ml-3 w-full md:ml-auto md:w-[300px]'
								genderMenu={genderMenu}
							/>
						</div>
					</div>
					<HoverMenu menu={menu} brands={brands} genderMenu={genderMenu} />
				</WidthContainer>
			</header>
			<main className='mt-5 mb-20'>
				<WidthContainer>{children}</WidthContainer>
			</main>
			<Footer className='mt-auto' />
		</>
	);
};
