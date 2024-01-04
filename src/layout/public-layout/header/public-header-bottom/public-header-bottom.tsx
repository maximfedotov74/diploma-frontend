import { FC } from 'react';
import { NavigationMenu } from './navigation-menu';
import { DesktopSearch } from '@/layout/public-layout/header/public-header-bottom/desktop-search';

export const PublicHeaderBottom: FC = (): JSX.Element => {
	return (
		<div className='relative'>
			<div className='flex justify-between'>
				<div className='lg:block hidden'>
					<NavigationMenu />
				</div>
				<div className='lg:block hidden'>
					<DesktopSearch />
				</div>
			</div>
		</div>
	);
};
