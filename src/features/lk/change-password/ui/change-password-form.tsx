import { ModelChangePasswordDto } from '@/shared/api/generated';
import { Button } from '@/shared/ui/button';
import { PasswordInput } from '@/shared/ui/password-input';
import { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ChangePasswordFormMode } from './change-password-dialog';
import { useChangePassword } from '../api/change-password';

export const ChangePasswordForm = ({
	closeDialog,
	setMode,
}: {
	closeDialog: () => void;
	setMode: Dispatch<SetStateAction<ChangePasswordFormMode>>;
}): JSX.Element => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ModelChangePasswordDto>({ mode: 'onChange' });

	const changePassword = useChangePassword(closeDialog, setMode);

	const onSubmit: SubmitHandler<ModelChangePasswordDto> = async data => {
		await changePassword({
			new_password: data.new_password,
			old_password: data.old_password,
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<PasswordInput
				placeholder='Старый пароль'
				className='mb-3'
				error={errors.old_password?.message}
				{...register('old_password', {
					min: {
						value: 6,
						message: 'Длина пароля должна быть не менее 6 символов!',
					},
					required: 'Пароль - обязательное поле!',
				})}
			/>
			<PasswordInput
				placeholder='Новый пароль'
				className='mb-3'
				error={errors.new_password?.message}
				{...register('new_password', {
					min: {
						value: 6,
						message: 'Длина пароля должна быть не менее 6 символов!',
					},
					required: 'Пароль - обязательное поле!',
				})}
			/>
			<Button>Изменить</Button>
		</form>
	);
};
