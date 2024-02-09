import { ModelCreateCategoryDto } from '@/shared/api/generated';
import { useGetAllCategories } from '@/shared/api/queries/get-all-categories';
import { CategoryChoice } from '@/shared/ui/category-choice';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FileUpload } from '../../file-upload/file-upload';
import { ALL_IMAGES } from '@/shared/constants/file-types';
import { Input } from '@/shared/ui/input';
import { useAddCategoryApi } from '../api/add-category-api';
import { Button } from '@/shared/ui/button';

export const AddCategoryForm = (): JSX.Element => {
	const {
		control,
		formState: { errors },
		register,
		handleSubmit,
		reset,
	} = useForm<ModelCreateCategoryDto>({ mode: 'onChange' });
	const { data: categories } = useGetAllCategories();
	const createCategory = useAddCategoryApi();

	const onSubmit: SubmitHandler<ModelCreateCategoryDto> = async data => {
		await createCategory({
			short_title: data.short_title,
			title: data.title,
			img_path: data.img_path,
			parent_category_id:
				typeof data.parent_category_id !== 'undefined'
					? +data.parent_category_id
					: undefined,
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
			<Input
				placeholder='Короткое название'
				className='mb-3'
				error={errors.short_title?.message}
				{...register('short_title', {
					required: 'Короткое название - обязательный параметр!',
					minLength: {
						value: 3,
						message: 'Короткое название должно быть не менее 3 символов!',
					},
				})}
			/>
			<Controller
				control={control}
				name='parent_category_id'
				render={({ field, formState: { errors: fieldErrs } }) => (
					<CategoryChoice
						onChange={field.onChange}
						defaultValue={field.value?.toString()}
						categories={categories || []}
						error={fieldErrs.parent_category_id?.message}
						className='mb-3'
						placeholder='Выбор родительской категории'
						showAll
					/>
				)}
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
