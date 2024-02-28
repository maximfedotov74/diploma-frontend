import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
	ModelDeliveryPoint,
	ModelUpdateDeliveryPointDto,
} from '@/shared/api/generated';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';

import { Textarea } from '@/shared/ui/textarea';
import { useEditDeliveryPointApi } from '../api/edit-delivery-point-api';
import { useDeleteDeliveryPointApi } from '../api/delete-delivery-point-api';
import { Checkbox } from '@/shared/ui/checkbox';
import { Label } from '@/shared/ui/label';

export const EditDeliveryPointForm = ({
	point,
}: {
	point: ModelDeliveryPoint;
}): JSX.Element => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<ModelUpdateDeliveryPointDto>({
		mode: 'onChange',
		defaultValues: {
			address: point.address,
			city: point.city,
			coords: point.coords,
			info: point.info,
			title: point.title,
			with_fitting: point.with_fitting,
			work_schedule: point.work_schedule,
		},
	});

	const deleteDeliveryPoint = useDeleteDeliveryPointApi();
	const editDeliveryPoint = useEditDeliveryPointApi();

	const onSubmit: SubmitHandler<ModelUpdateDeliveryPointDto> = async data => {
		await editDeliveryPoint({
			id: point.delivery_point_id,
			dto: {
				address: data.address,
				city: data.city,
				coords: data.coords,
				info: data.info,
				title: data.title,
				with_fitting: data.with_fitting,
				work_schedule: data.work_schedule,
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
						value: 2,
						message: 'Название должно быть не менее 2 символов!',
					},
				})}
			/>
			<Input
				placeholder='Город'
				className='mb-3'
				error={errors.city?.message}
				{...register('city', {
					required: 'Город - обязательный параметр!',
					minLength: {
						value: 2,
						message: 'Город должен быть не менее 2 символов!',
					},
				})}
			/>
			<Input
				placeholder='Адрес'
				className='mb-3'
				error={errors.address?.message}
				{...register('address', {
					required: 'Адрес - обязательный параметр!',
					minLength: {
						value: 15,
						message: 'Адрес должен быть не менее 15 символов!',
					},
				})}
			/>
			<Input
				placeholder='График работы'
				className='mb-3'
				error={errors.work_schedule?.message}
				{...register('work_schedule', {
					required: 'График работы - обязательный параметр!',
					minLength: {
						value: 2,
						message: 'График работы должен быть не менее 2 символов!',
					},
				})}
			/>
			<Input
				placeholder='Координаты'
				className='mb-3'
				error={errors.coords?.message}
				{...register('coords', {
					required: 'Координаты - обязательный параметр!',
					minLength: {
						value: 4,
						message: 'Координаты должны быть не менее 4 символов!',
					},
				})}
			/>
			<Textarea
				placeholder='Информация'
				className='mb-3'
				error={errors.info?.message}
				{...register('info', {
					minLength: {
						value: 4,
						message: 'Информация должна быть не менее 4 символов!',
					},
				})}
			/>
			<div className='flex items-center mb-3'>
				<Controller
					control={control}
					name='with_fitting'
					render={({ field }) => (
						<Checkbox
							id={`add-delivery-point-checkbox`}
							checked={field.value}
							onCheckedChange={field.onChange}
						/>
					)}
				/>

				<Label htmlFor={`add-delivery-point-checkbox`} className='ml-2'>
					С примерекой
				</Label>
			</div>
			<div className='flex items-center'>
				<Button type='submit'>Редактировать</Button>
				<Button
					type='button'
					variant='outline'
					className='ml-auto'
					onClick={() => deleteDeliveryPoint(point.delivery_point_id)}
				>
					Удалить
				</Button>
			</div>
		</form>
	);
};
