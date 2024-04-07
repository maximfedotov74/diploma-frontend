import { Button } from '@/shared/ui/button';
import { TypographyH1, TypographySmall } from '@/shared/ui/typography';
import { useState } from 'react';
import { LoginForm } from './login-form';
import { RegistrationForm } from './registration-form';

export type AuthFormType = 'registration' | 'login';

export const AuthView = (): JSX.Element => {
	const [form, setForm] = useState<AuthFormType>('login');

	return (
		<div className='max-w-[500px] ml-auto mr-auto mb-5'>
			{form === 'login' ? (
				<div>
					<TypographyH1 className='mb-4'>Авторизация</TypographyH1>
					<div>
						<TypographySmall>Впервые здесь?</TypographySmall>
						<Button
							variant='link'
							onClick={() => setForm('registration')}
							className='p-0 ml-2'
						>
							Зарегестрироваться
						</Button>
					</div>
				</div>
			) : (
				<div>
					<TypographyH1 className='mb-4'>Регистрация</TypographyH1>
					<TypographySmall>Есть аккаунт?</TypographySmall>
					<Button
						onClick={() => setForm('login')}
						variant='link'
						className='p-0 ml-2'
					>
						Войдите
					</Button>
				</div>
			)}
			{form === 'login' ? (
				<LoginForm />
			) : (
				<RegistrationForm setForm={setForm} />
			)}
		</div>
	);
};
