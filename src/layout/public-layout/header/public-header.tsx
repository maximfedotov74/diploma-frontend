import { FC } from 'react';
import { Container } from '../../container';
import { PublichHeaderTop } from './public-header-top';
import { NavigationMenu } from './public-header-bottom/navigation-menu';
import { PublicHeaderMiddle } from './public-header-middle/public-header-middle';
import { PublicHeaderBottom } from './public-header-bottom/public-header-bottom';

export const PublicHeader: FC = (): JSX.Element => {
	return (
		<header>
			<PublichHeaderTop />
			<Container>
				<div className='flex items-center justify-between relative min-h-[90px]'>
					<PublicHeaderMiddle />
				</div>
				<PublicHeaderBottom />
			</Container>
		</header>
	);
};
