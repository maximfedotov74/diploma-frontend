import { ModelCreateSizeDto } from '@/shared/api/generated';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAddSize } from '../api/add-size-api';

export const AdminAddSizeForm = () => {
	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm<ModelCreateSizeDto>({ mode: 'onChange' });

	const createSize = useAddSize();

	const onSumbit: SubmitHandler<ModelCreateSizeDto> = async data => {
		await createSize({ value: data.value });
		reset();
	};

	return (
		<form onSubmit={handleSubmit(onSumbit)}>
			<Input
				placeholder='Значение'
				className='mb-3'
				error={errors.value?.message}
				{...register('value', {
					required: 'Значение - обязательный параметр!',
					minLength: {
						value: 1,
						message: 'Значение должно быть не менее 1 символов!',
					},
				})}
			/>
			<Button>Создать</Button>
		</form>
	);
};
