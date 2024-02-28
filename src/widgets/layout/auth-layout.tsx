import { Logo } from '@/shared/ui/logo';
import { WidthContainer } from '@/shared/ui/width-container';
import { ReactNode } from 'react';
import { ChangeThemeButton } from '@/features/change-theme/change-theme-button';
import { Location } from '@/features/layout-location/location';
import { Footer } from './footer';

export const AuthLayout = ({
	children,
}: {
	children: ReactNode;
}): JSX.Element => {
	return (
		<>
			<header>
				<WidthContainer>
					<div className='flex flex-col sm:flex-row items-center relative mt-3'>
						<Location />
						<Logo className='sm:absolute sm:top-1/2 sm:-translate-x-2/3 sm:-translate-y-1/2 sm:left-1/2 mb-3 sm:mb-0 italic' />
						<ChangeThemeButton className='ml-auto' />
					</div>
				</WidthContainer>
			</header>
			<main className='mt-20'>
				<WidthContainer>{children}</WidthContainer>
			</main>
			<Footer className='mt-auto' />
		</>
	);
};
