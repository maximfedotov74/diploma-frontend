import { withLayout } from '@/layout/with-layout';
import { GetServerSideProps } from 'next';
import { FC } from 'react';

const MenHome: FC = (): JSX.Element => {
	return (
		<div>
			<h1>Men home</h1>
		</div>
	);
};

export default withLayout(MenHome);

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	res.setHeader('Set-Cookie', 'menu-gender=men;path=/;secure=true');
	return {
		props: {},
	};
};
