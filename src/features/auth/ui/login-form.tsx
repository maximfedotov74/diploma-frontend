import { ModelLoginDto } from '@/shared/api/generated';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { PasswordInput } from '@/shared/ui/password-input';
import { useLoginApi } from '../api/login-api';
import { SubmitHandler, useForm } from 'react-hook-form';
import { validEmail } from '@/shared/constants/regexp';

export const LoginForm = (): JSX.Element => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<ModelLoginDto>({ mode: 'onChange' });

	const login = useLoginApi();

	const onSubmit: SubmitHandler<ModelLoginDto> = async data => {
		await login({ email: data.email, password: data.password });
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input
				placeholder='Введите email'
				type='email'
				error={errors.email?.message}
				className='mb-3'
				{...register('email', {
					pattern: {
						value: validEmail,
						message: 'Некорректный email!',
					},
					required: 'Email - обязательное поле!',
				})}
			/>
			<PasswordInput
				placeholder='Введите пароль'
				className='mb-3'
				error={errors.password?.message}
				{...register('password', {
					min: {
						value: 6,
						message: 'Длина пароля должна быть не менее 6 символов!',
					},
					required: 'Пароль - обязательное поле!',
				})}
			/>
			<Button className='w-full'>Войти</Button>
		</form>
	);
};
