import { ModelOption, ModelUpdateOptionDto } from '@/shared/api/generated';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useEditCharacteristicApi } from '../api/edit-characteristic-api';
import { useDeleteCharacteristicApi } from '../api/delete-characteristic-api';

export const AdminEditCharacteristicForm = ({
	option,
}: {
	option: ModelOption;
}): JSX.Element => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		control,
	} = useForm<ModelUpdateOptionDto>({
		mode: 'onChange',
		defaultValues: {
			for_catalog: option.for_catalog,
			slug: option.slug,
			title: option.title,
		},
	});

	const editEditCharacteristic = useEditCharacteristicApi();
	const deleteCharacteristic = useDeleteCharacteristicApi();

	const onSubmit: SubmitHandler<ModelUpdateOptionDto> = async data => {
		await editEditCharacteristic({
			dto: {
				for_catalog: data.for_catalog,
				slug: data.slug,
				title: data.title,
			},
			id: option.id,
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input
				placeholder='Короткое название'
				className='mb-3'
				error={errors.title?.message}
				{...register('title', {
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
					minLength: {
						value: 3,
						message: 'Slug должно быть не менее 3 символов!',
					},
				})}
			/>
			<div className='flex items-center mb-3'>
				<Controller
					control={control}
					name='for_catalog'
					render={({ field }) => (
						<Checkbox
							id={`${option.id}-edit-checkbox`}
							checked={field.value}
							onCheckedChange={field.onChange}
						/>
					)}
				/>

				<Label htmlFor={`${option.id}-edit-checkbox`} className='ml-2'>
					Для каталога
				</Label>
			</div>
			<div className='flex items-center'>
				<Button type='submit'>Изменить</Button>
				<Button
					type='button'
					variant='outline'
					className='ml-auto'
					onClick={() => deleteCharacteristic(option.id)}
				>
					Удалить
				</Button>
			</div>
		</form>
	);
};
