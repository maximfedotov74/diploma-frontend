import { ModelCreateUserDto } from '@/shared/api/generated';
import { validEmail } from '@/shared/constants/regexp';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { PasswordInput } from '@/shared/ui/password-input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRegistrationApi } from '../api/registration-api';

export const RegistrationForm = (): JSX.Element => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<ModelCreateUserDto>({ mode: 'onChange' });

	const registration = useRegistrationApi();

	const onSubmit: SubmitHandler<ModelCreateUserDto> = async data => {
		await registration({ email: data.email, password: data.password });
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{/* <Input placeholder='Введите имя' type='email' className='mb-3' /> */}
			<Input
				placeholder='Введите email'
				type='email'
				error={errors.email?.message}
				className='mb-3'
				{...register('email', {
					pattern: validEmail,
					required: 'Email - обязательное поле!',
				})}
			/>
			<PasswordInput
				placeholder='Придумайте пароль'
				className='mb-3'
				error={errors.password?.message}
				{...register('password', {
					min: {
						value: 6,
						message: 'Длина пароля должна быть не менее 6 символов!',
					},
					required: 'Email - обязательное поле!',
				})}
			/>
			{/* <PasswordInput placeholder='Повторите пароль' className='mb-3' /> */}
			<Button className='w-full'>Регистрация</Button>
		</form>
	);
};
