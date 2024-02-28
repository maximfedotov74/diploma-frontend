import { SubmitHandler, useForm } from 'react-hook-form';
import { useEditProductApi } from '../api/edit-product-api';
import {
	ModelAdminProduct,
	ModelUpdateProductDto,
} from '@/shared/api/generated';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { useDeleteProductApi } from '../api/delete-product-api';
import { Textarea } from '@/shared/ui/textarea';

export const EditProductForm = ({
	product,
}: {
	product: ModelAdminProduct;
}): JSX.Element => {
	const { editProduct } = useEditProductApi();

	const { register, handleSubmit } = useForm<ModelUpdateProductDto>({
		mode: 'onChange',
		defaultValues: {
			description: product.description ? product.description : '',
			title: product.title,
		},
	});

	const { deleteProduct } = useDeleteProductApi();

	const onSubmit: SubmitHandler<ModelUpdateProductDto> = data => {
		editProduct({ dto: data, id: product.id });
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input placeholder='Название' className='mb-3' {...register('title')} />
			<Textarea
				placeholder='Описание'
				className='mb-3'
				{...register('description')}
			/>
			<div className='flex items-center'>
				<Button type='submit'>Редактировать</Button>
				<Button
					type='button'
					variant='outline'
					onClick={() => deleteProduct(product.id)}
					className='ml-auto'
				>
					Удалить
				</Button>
			</div>
		</form>
	);
};
