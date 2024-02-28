import { ModelCreateBrandDto } from '@/shared/api/generated';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FileUpload } from '../../../../file-upload/file-upload';
import { ALL_IMAGES } from '@/shared/constants/file-types';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { useAddBrandApi } from '../api/add-brand-api';
import { Textarea } from '@/shared/ui/textarea';

export const AddBrandForm = (): JSX.Element => {
	const {
		control,
		formState: { errors },
		register,
		handleSubmit,
		reset,
	} = useForm<ModelCreateBrandDto>({ mode: 'onChange' });
	const createBrand = useAddBrandApi();

	const onSubmit: SubmitHandler<ModelCreateBrandDto> = async data => {
		await createBrand({
			title: data.title,
			description: data.description ? data.description : undefined,
			img_path: data.img_path,
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
			<Textarea
				placeholder='Описание'
				className='mb-3'
				error={errors.description?.message}
				{...register('description', {
					minLength: {
						value: 10,
						message: 'Описание должно быть не менее 10 символов!',
					},
				})}
			/>
			<Controller
				control={control}
				name='img_path'
				render={({ field }) => (
					<FileUpload
						className='mb-3'
						placeholder='Выбрать файл'
						accept={ALL_IMAGES}
						value={field.value}
						onChange={field.onChange}
					/>
				)}
			/>
			<Button>Создать</Button>
		</form>
	);
};
