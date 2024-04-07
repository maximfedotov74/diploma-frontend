import { ModelCreateRoleDto } from '@/shared/api/generated';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { useCreateRole } from '../api/create-role-api';

export const CreateRoleForm = (): JSX.Element => {
	const {
		formState: { errors },
		register,
		handleSubmit,
		reset,
	} = useForm<ModelCreateRoleDto>({ mode: 'onChange' });

	const createRole = useCreateRole();

	const onSubmit: SubmitHandler<ModelCreateRoleDto> = async data => {
		await createRole({
			title: data.title,
		});
		reset();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='mb-2'>
			<Input
				placeholder='Название'
				className='mb-3'
				error={errors.title?.message}
				{...register('title', {
					required: 'Название - обязательный параметр!',
					minLength: {
						value: 3,
						message: 'Название должно быть не менее 3 символов!',
					},
				})}
			/>
			<Button>Создать</Button>
		</form>
	);
};
