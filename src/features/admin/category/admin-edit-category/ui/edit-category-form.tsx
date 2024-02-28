import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
	ModelCategoryRelation,
	ModelUpdateCategoryDto,
} from '@/shared/api/generated';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { FileUpload } from '../../../../file-upload/file-upload';
import { ALL_IMAGES } from '@/shared/constants/file-types';
import { useEditCategoryApi } from '../api/edit-category-api';
import { useDeleteCategoryApi } from '../api/delete-category-api';

export const EditCategoryForm = ({
	category,
}: {
	category: ModelCategoryRelation;
}): JSX.Element => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<ModelUpdateCategoryDto>({
		mode: 'onChange',
		defaultValues: {
			img_path: category.img_path,
			short_title: category.short_title,
			title: category.title,
		},
	});

	const editCategory = useEditCategoryApi();
	const deleteCategory = useDeleteCategoryApi();
	const onSubmit: SubmitHandler<ModelUpdateCategoryDto> = async data => {
		await editCategory({
			id: category.category_id,
			dto: {
				img_path: data.img_path,
				short_title: data.short_title,
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
					minLength: {
						value: 3,
						message: 'Название должно быть не менее 3 символов!',
					},
				})}
			/>
			<Input
				placeholder='Короткое название'
				className='mb-3'
				error={errors.short_title?.message}
				{...register('short_title', {
					minLength: {
						value: 3,
						message: 'Короткое название должно быть не менее 3 символов!',
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
					onClick={() => deleteCategory(category.slug)}
				>
					Удалить
				</Button>
			</div>
		</form>
	);
};
