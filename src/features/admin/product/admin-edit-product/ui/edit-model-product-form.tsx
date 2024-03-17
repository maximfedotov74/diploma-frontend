import {
	ModelProductModel,
	ModelUpdateProductModelDto,
} from '@/shared/api/generated';
import { useEditModelProductApi } from '../api/edit-model-product-api';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/shared/ui/input';
import { FileUpload } from '@/features/file-upload/file-upload';
import { ALL_IMAGES } from '@/shared/constants/file-types';
import { Button } from '@/shared/ui/button';

export const EditModelProductForm = ({
	model,
}: {
	model: ModelProductModel;
}): JSX.Element => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm<ModelUpdateProductModelDto>({
		mode: 'onChange',
		defaultValues: {
			discount: model.discount,
			image_path: model.image_path,
			price: model.price,
		},
	});
	const editProductModel = useEditModelProductApi(model.product_id);

	const onSubmit: SubmitHandler<ModelUpdateProductModelDto> = async data => {
		await editProductModel({
			dto: {
				discount: data.discount ? +data.discount : undefined,
				image_path: data.image_path,
				price: data.price ? +data.price : undefined,
			},
			id: model.id,
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input
				type='number'
				{...register('price', {
					required: 'Цена - обязательное поле!',
				})}
				placeholder='Цена'
				className='mb-3'
				error={errors.price?.message}
			/>
			<Input
				className='mb-3'
				type='number'
				step={0.1}
				{...register('discount', {
					min: {
						value: 1,
						message: 'Размер скидки должен быть не менее 1%',
					},
					max: {
						value: 99,
						message: 'Размер скидки должен быть не более 99%',
					},
				})}
				error={errors.discount?.message}
				placeholder='Скидка %'
			/>
			<Controller
				control={control}
				name='image_path'
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
			<Button>Изменить</Button>
		</form>
	);
};
