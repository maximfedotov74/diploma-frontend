import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { PasswordInput } from '@/shared/ui/password-input';

export const LoginForm = (): JSX.Element => {
	return (
		<form>
			<PasswordInput placeholder='Пароль' className='mb-3' />
			<Input placeholder='Email' type='email' className='mb-3' />
			<Button className='w-full'>Войти</Button>
		</form>
	);
};
