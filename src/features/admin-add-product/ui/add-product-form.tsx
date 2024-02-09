import { ModelCreateProductDto } from '@/shared/api/generated';
import { useGetAllBrands } from '@/shared/api/queries/get-all-brands';
import { useGetAllCategories } from '@/shared/api/queries/get-all-categories';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useAddProductApi } from '../api/add-product-api';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { CategoryChoice } from '@/shared/ui/category-choice';
import { Combobox } from '@/shared/ui/combobox';

export const AddProductForm = (): JSX.Element => {
	const { createProduct } = useAddProductApi();

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		setValue,
		getValues,
	} = useForm<ModelCreateProductDto>({
		mode: 'onChange',
	});

	const setBrandId = (value: string) => {
		setValue('brand_id', +value);
	};

	const setCategoryId = (value: string) => {
		setValue('category_id', +value);
	};

	const onSubmit: SubmitHandler<ModelCreateProductDto> = async data => {
		await createProduct({
			brand_id: +data.brand_id,
			category_id: +data.category_id,
			title: data.title,
			description: data.description === '' ? undefined : data.description,
		});
		setValue('description', '');
		setValue('title', '');
		console.log(getValues());
	};

	const { data: brands } = useGetAllBrands();
	const { data: categories } = useGetAllCategories();

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
			<Input
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
				name='category_id'
				render={({ field }) => (
					<CategoryChoice
						onChange={setCategoryId}
						defaultValue={field.value?.toString()}
						categories={categories || []}
						error={errors.category_id?.message}
						placeholder='Выбор категории'
						className='mb-3'
					/>
				)}
				rules={{ required: 'ID категории обязательное поле!' }}
			/>
			<Controller
				control={control}
				name='brand_id'
				render={({ field }) => (
					<Combobox
						items={brands || []}
						setValue={setBrandId}
						value={field.value?.toString()}
						placeholder='Выберите бренд'
						error={errors.brand_id?.message}
						className='mb-3'
					/>
				)}
				rules={{
					required: 'ID бренда обязательное поле!',
					min: { value: 1, message: 'ID должен быть больше нуля!' },
				}}
			/>
			<Button>Создать</Button>
		</form>
	);
};
