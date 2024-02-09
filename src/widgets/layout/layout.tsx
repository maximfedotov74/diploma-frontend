import { Location } from '@/features/layout-location/location';
import {
	ModelCategoryModel,
	ModelCategoryRelation,
} from '@/shared/api/generated';
import { ChangeThemeButton } from '@/features/change-theme/change-theme-button';
import { ProfilePropdown } from '@/features/layout-profile/ui/profile-dropdown';
import { WidthContainer } from '@/shared/ui/width-container';
import { ReactNode } from 'react';
import { Logo } from '@/shared/ui/logo';
import { CategoriesMenu } from './categories-menu';
import { ModelSearch } from '@/features/model-search/model-search';
import { TopHeader } from './top-header';

type LayoutProps = {
	children: ReactNode;
	topLevels: ModelCategoryModel[];
	menu: ModelCategoryRelation;
};

export const Layout = ({
	children,
	topLevels,
	menu,
}: LayoutProps): JSX.Element => {
	return (
		<>
			<header>
				<WidthContainer>
					<TopHeader />
					<div className='flex flex-col sm:flex-row items-center relative mt-3'>
						<Logo className='sm:absolute sm:top-1/2 sm:-translate-x-2/3 sm:-translate-y-1/2 sm:left-1/2 mb-3 sm:mb-0 italic' />
						<div className='flex items-center w-full'>
							<CategoriesMenu menu={menu} topLevels={topLevels} />
							<ModelSearch className='ml-auto' />
						</div>
					</div>
				</WidthContainer>
			</header>
			<main className='mt-5'>
				<WidthContainer>{children}</WidthContainer>
			</main>
			<footer></footer>
		</>
	);
};