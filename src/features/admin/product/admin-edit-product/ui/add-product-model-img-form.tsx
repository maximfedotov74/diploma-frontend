import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/shared/ui/button';
import { ALL_IMAGES } from '@/shared/constants/file-types';
import { FileUpload } from '@/features/file-upload/file-upload';
import {
	ModelProductModel,
	ModelCreateProducModelImg,
} from '@/shared/api/generated';
import { useAddModelProductImgApi } from '../api/add-model-product-img-api';

export const AddModelProductImg = ({
	model,
}: {
	model: ModelProductModel;
}): JSX.Element => {
	const { handleSubmit, control, resetField } =
		useForm<ModelCreateProducModelImg>({
			mode: 'onChange',
		});

	const addImage = useAddModelProductImgApi(model.id);

	const onSubmit: SubmitHandler<ModelCreateProducModelImg> = async data => {
		await addImage({ img_path: data.img_path, product_model_id: model.id });
		resetField('img_path');
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Controller
				control={control}
				name='img_path'
				render={({ field, formState: { errors } }) => (
					<FileUpload
						className='mb-3'
						placeholder='Выбрать файл'
						accept={ALL_IMAGES}
						value={field.value}
						onChange={field.onChange}
						error={errors.img_path?.message}
					/>
				)}
				rules={{ required: 'Изображение - обязательное поле!' }}
			/>
			<Button>Добавить фото</Button>
		</form>
	);
};
