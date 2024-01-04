import { withLayout } from '@/layout/with-layout';
import { GetServerSideProps } from 'next';
import { FC } from 'react';

const WomenHome: FC = (): JSX.Element => {
	return (
		<div>
			<h1>Women home</h1>
		</div>
	);
};

export default withLayout(WomenHome);

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	res.setHeader('Set-Cookie', 'menu-gender=women;path=/');
	return {
		props: {},
	};
};
