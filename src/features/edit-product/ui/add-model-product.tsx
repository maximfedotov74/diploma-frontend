import {
	ModelAdminProduct,
	ModelCreateProductModelDto,
} from '@/shared/api/generated';
import { Button } from '@/shared/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog';
import { useAddProductModelApi } from '../api/add-model-product-api';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/shared/ui/input';
import { FileInput } from '@/shared/ui/file-input';
import { ALL_IMAGES } from '@/shared/constants/file-types';
import { FileUpload } from '@/features/file-upload/file-upload';

export const AddModelProduct = ({
	product,
}: {
	product: ModelAdminProduct;
}): JSX.Element => {
	const { createProductModel } = useAddProductModelApi(product.id);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm<ModelCreateProductModelDto>({
		mode: 'onChange',
	});

	const onSubmit: SubmitHandler<ModelCreateProductModelDto> = async data => {
		await createProductModel({
			price: +data.price,
			discount: data.discount ? +data.discount : undefined,
			product_id: product.id,
			image_path: data.image_path,
		});
		reset();
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='ghost' className='mb-4 break-words'>
					Добавить модель товару (ID:{product.id})
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Создание модели</DialogTitle>
				</DialogHeader>
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
					<Button>Создать</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};
