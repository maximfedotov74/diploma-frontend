import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ModelBrand, ModelUpdateBrandDto } from '@/shared/api/generated';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { FileUpload } from '../../../../file-upload/file-upload';
import { ALL_IMAGES } from '@/shared/constants/file-types';
import { useDeleteBrandApi } from '../api/delete-brand-api';
import { useEditBrandApi } from '../api/edit-brand-api';
import { Textarea } from '@/shared/ui/textarea';

export const EditBrandForm = ({
	brand,
}: {
	brand: ModelBrand;
}): JSX.Element => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<ModelUpdateBrandDto>({
		mode: 'onChange',
		defaultValues: {
			description: brand.description,
			img_path: brand.img_path,
			title: brand.title,
		},
	});

	const deleteBrand = useDeleteBrandApi();
	const editBrand = useEditBrandApi();

	const onSubmit: SubmitHandler<ModelUpdateBrandDto> = async data => {
		await editBrand({
			id: brand.id,
			dto: {
				description: data.description,
				img_path: data.img_path,
				title: data.title,
			},
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
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
			<div className='flex items-center'>
				<Button type='submit'>Редактировать</Button>
				<Button
					type='button'
					variant='outline'
					className='ml-auto'
					onClick={() => deleteBrand(brand.slug)}
				>
					Удалить
				</Button>
			</div>
		</form>
	);
};
