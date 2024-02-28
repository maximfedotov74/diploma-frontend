import { WidthContainer } from '@/shared/ui/width-container';
import { ReactNode } from 'react';
import { TopHeader } from './top-header';
import { AdminMenu } from './admin-menu';

export const AdminLayout = ({
	children,
}: {
	children: ReactNode;
}): JSX.Element => {
	return (
		<>
			<header>
				<WidthContainer>
					<TopHeader />
					<AdminMenu />
				</WidthContainer>
			</header>
			<main>
				<WidthContainer>{children}</WidthContainer>
			</main>
			<footer className='mt-auto'></footer>
		</>
	);
};
