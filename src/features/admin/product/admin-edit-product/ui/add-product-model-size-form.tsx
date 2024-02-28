import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/shared/ui/button';

import {
	ModelAddSizeToProductModelDto,
	ModelAdminProductModelRelation,
} from '@/shared/api/generated';
import { useAddModelSize } from '../api/add-model-product-size-api';
import { Input } from '@/shared/ui/input';
import { useGetAllSizes } from '@/shared/api/queries/get-all-sizes-api';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui/select';
import { ErrorText } from '@/shared/ui/error-text';

export const AddModelProductSize = ({
	model,
}: {
	model: ModelAdminProductModelRelation;
}): JSX.Element => {
	const {
		handleSubmit,
		control,
		register,
		formState: { errors },
	} = useForm<ModelAddSizeToProductModelDto>({
		mode: 'onChange',
	});

	const addSize = useAddModelSize(model.id);

	const { data: sizes } = useGetAllSizes();

	const onSubmit: SubmitHandler<ModelAddSizeToProductModelDto> = async data => {
		console.log(+data.in_stock);

		await addSize({
			in_stock: +data.in_stock,
			literal: data.literal,
			size_id: +data.size_id,
			product_model_id: model.id,
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input
				placeholder='В наличии'
				className='mb-3'
				type='number'
				{...register('in_stock', {
					required: 'В наличии - обязательное поле!',
					min: {
						value: 0,
						message: 'Значение должно быть положительным!',
					},
				})}
				error={errors.in_stock?.message}
			/>

			<Input
				placeholder='Литеральное значение'
				className='mb-3'
				{...register('literal', {
					required: 'Литеральное значение - обязательное поле!',
				})}
				error={errors.literal?.message}
			/>

			<Controller
				control={control}
				name='size_id'
				rules={{
					required: 'Размер - обязательное поле!',
					min: {
						value: 1,
						message: 'ID Размера должен быть больше нуля!',
					},
				}}
				render={({ field }) => (
					<div className='mb-3'>
						<Select
							defaultValue={field.value?.toString()}
							onValueChange={field.onChange}
						>
							<SelectTrigger className='w-[180px]'>
								<SelectValue placeholder='Размер' />
							</SelectTrigger>
							<SelectContent>
								{sizes?.map(s => (
									<SelectItem key={s.id} value={s.id.toString()}>
										{s.value}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<ErrorText error={errors.size_id?.message} />
					</div>
				)}
			/>

			<Button>Добавить размер</Button>
		</form>
	);
};
