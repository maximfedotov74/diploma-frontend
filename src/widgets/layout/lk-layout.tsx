import {
	ModelActionGender,
	ModelBrand,
	ModelCategoryModel,
	ModelCategoryRelation,
} from '@/shared/api/generated';

import { WidthContainer } from '@/shared/ui/width-container';
import { ReactNode } from 'react';
import { Logo } from '@/shared/ui/logo';
import { Search } from '@/features/search/search';
import { TopHeader } from './top-header';
import { GenderMenu } from './gender-menu';
import { HoverMenu } from './hover-menu';
import { Footer } from './footer';
import { MobileMenu } from './mobile-menu';
import { LayoutLkSidebar } from './layout-lk-sidebar';

type LayoutProps = {
	children: ReactNode;
	topLevels: ModelCategoryModel[];
	menu: ModelCategoryRelation;
	genderMenu: ModelActionGender;
	brands: ModelBrand[];
};

export const LKLayout = ({
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
			<main className='mt-5'>
				<WidthContainer>
					<div className='sm:flex'>
						<LayoutLkSidebar className='mb-6 sm:mr-20 sm:mb-0' />
						<div className='grow'>{children}</div>
					</div>
				</WidthContainer>
			</main>
			<Footer className='mt-auto' />
		</>
	);
};
