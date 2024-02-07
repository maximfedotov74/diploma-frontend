import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/shared/ui/dialog';
import { TypographySmall } from '@/shared/ui/typography';
import { LoginForm } from './login-form';
import { RegistrationForm } from './registration-form';
import { useState } from 'react';
import { Button } from '@/shared/ui/button';

export const AuthDialog = (): JSX.Element => {
	const [form, setForm] = useState<'registration' | 'login'>('login');

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle className='text-lg sm:text-2xl mt-3'>
					Добро пожаловать в Fam Moda
				</DialogTitle>
				<DialogDescription asChild>
					{form === 'login' ? (
						<div>
							<TypographySmall>Впервые здесь?</TypographySmall>
							<Button variant='link' onClick={() => setForm('registration')}>
								Зарегестрироваться
							</Button>
						</div>
					) : (
						<div>
							<TypographySmall>Есть аккаунт?</TypographySmall>
							<Button onClick={() => setForm('login')} variant='link'>
								Войдите
							</Button>
						</div>
					)}
				</DialogDescription>
			</DialogHeader>
			{form === 'login' ? <LoginForm /> : <RegistrationForm />}
		</DialogContent>
	);
};
