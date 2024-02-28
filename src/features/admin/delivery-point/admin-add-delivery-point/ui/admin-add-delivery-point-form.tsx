import { ModelCreateDeliveryPointDto } from '@/shared/api/generated';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Textarea } from '@/shared/ui/textarea';
import { useAddDeliverypointApi } from '../api/add-delivery-point-api';
import { Checkbox } from '@/shared/ui/checkbox';
import { Label } from '@/shared/ui/label';

export const AddDeliveryPointForm = (): JSX.Element => {
	const {
		control,
		formState: { errors },
		register,
		handleSubmit,
		reset,
	} = useForm<ModelCreateDeliveryPointDto>({
		mode: 'onChange',
		defaultValues: { with_fitting: false },
	});

	const createDeliveryPoint = useAddDeliverypointApi();

	const onSubmit: SubmitHandler<ModelCreateDeliveryPointDto> = async data => {
		await createDeliveryPoint({
			address: data.address,
			city: data.city,
			coords: data.coords,
			title: data.title,
			work_schedule: data.work_schedule,
			with_fitting: data.with_fitting,
			info: data.info ? data.info : undefined,
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
			<Button>Создать</Button>
		</form>
	);
};
