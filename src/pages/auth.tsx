import { AuthView } from '@/features/auth/ui/auth-view';
import { Meta } from '@/shared/meta/meta';

import { AuthLayout } from '@/widgets/layout/auth-layout';
import { GetServerSideProps } from 'next';

const Auth = (): JSX.Element => {
	return (
		<Meta title='Авторизация и Регистрация'>
			<AuthLayout>
				<AuthView />
			</AuthLayout>
		</Meta>
	);
};

export default Auth;

export const getServerSideProps: GetServerSideProps = async context => {
	context.res.setHeader('Set-Cookie', [
		`access_token=deleted; Max-Age=0; Path=/`,
		`refresh_token=deleted; Max-Age=0; Path=/`,
	]);
	return {
		props: {},
	};
};
