import { ModelCreateOptionDto } from '@/shared/api/generated';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAddCharacteristic } from '../api/add-characteristic-api';

export const AdminAddCharacteristicForm = () => {
	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm<ModelCreateOptionDto>({ mode: 'onChange' });

	const createOption = useAddCharacteristic();

	const onSumbit: SubmitHandler<ModelCreateOptionDto> = async data => {
		await createOption({ slug: data.slug, title: data.title });
		reset();
	};

	return (
		<form onSubmit={handleSubmit(onSumbit)}>
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
			<Input
				placeholder='Slug'
				className='mb-3'
				error={errors.slug?.message}
				{...register('slug', {
					required: 'Slug - обязательный параметр!',
					minLength: {
						value: 3,
						message: 'Slug должно быть не менее 3 символов!',
					},
				})}
			/>
			<Button>Создать</Button>
		</form>
	);
};
