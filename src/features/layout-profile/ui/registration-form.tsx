import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { PasswordInput } from '@/shared/ui/password-input';

export const RegistrationForm = (): JSX.Element => {
	return (
		<form>
			<Input placeholder='Введите имя' type='email' className='mb-3' />
			<Input placeholder='Введите email' type='email' className='mb-3' />
			<PasswordInput placeholder='Придумайте пароль' className='mb-3' />
			<PasswordInput placeholder='Повторите пароль' className='mb-3' />
			<Button className='w-full'>Регистрация</Button>
		</form>
	);
};
