import { ModelCreateUserDto } from '@/shared/api/generated';
import { validEmail } from '@/shared/constants/regexp';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { PasswordInput } from '@/shared/ui/password-input';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useRegistrationApi } from '../api/registration-api';
import { Checkbox } from '@/shared/ui/checkbox';
import { Label } from '@/shared/ui/label';
import { ErrorText } from '@/shared/ui/error-text';
import { useToast } from '@/shared/ui/use-toast';
import { Dispatch, SetStateAction } from 'react';
import { AuthFormType } from './auth-view';
import { Link } from '@/shared/ui/link';
import { POLICY_PAGE } from '@/shared/constants/routes/public';

type RegistrationFormData = ModelCreateUserDto & {
	confirmPassword: string;
	policy: boolean;
};

export const RegistrationForm = ({
	setForm,
}: {
	setForm: Dispatch<SetStateAction<AuthFormType>>;
}): JSX.Element => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		control,
		reset,
	} = useForm<RegistrationFormData>({ mode: 'onChange' });

	const registration = useRegistrationApi();

	const { toast } = useToast();

	const onSubmit: SubmitHandler<RegistrationFormData> = async data => {
		if (data.password !== data.confirmPassword) {
			toast({ title: 'Пароли не совпадают!' });
			return;
		}

		await registration({ email: data.email, password: data.password });
		reset();
		setForm('login');
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
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
					required: 'Пароль - обязательное поле!',
				})}
			/>
			<PasswordInput
				error={errors.confirmPassword?.message}
				{...register('confirmPassword', {
					minLength: {
						value: 6,
						message: 'Длина пароля должна быть не менее 6 символов!',
					},
					required: 'Повтор пароля - обязательное поле!',
				})}
				placeholder='Повторите пароль'
				className='mb-3'
			/>
			<div className='mb-3'>
				<div className='flex items-center '>
					<Controller
						control={control}
						name='policy'
						rules={{
							required: 'Обязательное поле!',
						}}
						render={({ field }) => (
							<Checkbox
								id={`policy-checkbox`}
								checked={field.value}
								onCheckedChange={field.onChange}
							/>
						)}
					/>
					<Label htmlFor={`policy-checkbox`} className='ml-2'>
						Согласие с политикой конфиденциальности
					</Label>
					<Link className='ml-2' href={POLICY_PAGE}>
						Подробнее
					</Link>
				</div>
				<ErrorText error={errors.policy?.message} />
			</div>
			<Button className='w-full'>Регистрация</Button>
		</form>
	);
};
