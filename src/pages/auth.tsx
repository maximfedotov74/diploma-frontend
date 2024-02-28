import { AuthView } from '@/features/auth/ui/auth-view';
import { Meta } from '@/shared/meta/meta';

import { AuthLayout } from '@/widgets/layout/auth-layout';

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
