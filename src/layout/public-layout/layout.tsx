import { FC, PropsWithChildren } from 'react';
import { PublicHeader } from './header/public-header';
import { PublicFooter } from './public-footer';
import { Container } from '../container';

export const PublicLayout: FC<PropsWithChildren> = ({
	children,
}): JSX.Element => {
	return (
		<>
			<PublicHeader />
			<main>
				<Container>{children}</Container>
			</main>
			<PublicFooter />
		</>
	);
};
