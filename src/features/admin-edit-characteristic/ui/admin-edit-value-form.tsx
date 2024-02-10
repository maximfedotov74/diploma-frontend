import {
	ModelOptionValue,
	ModelUpdateOptionValueDto,
} from '@/shared/api/generated';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEditValue } from '../api/edit-value-api';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useDeleteValue } from '../api/delete-value-api';

export const AdminEditValueForm = ({
	value,
}: {
	value: ModelOptionValue;
}): JSX.Element => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<ModelUpdateOptionValueDto>({
		mode: 'onChange',
		defaultValues: {
			info: value.info,
			value: value.value,
		},
	});

	const editValue = useEditValue(value.option_id);

	const deleteValue = useDeleteValue(value.option_id);

	const onSubmit: SubmitHandler<ModelUpdateOptionValueDto> = async data => {
		await editValue({
			dto: { info: data.info ? data.info : undefined, value: data.value },
			id: value.id,
		});
		reset();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input
				className='mb-3'
				placeholder='Значение'
				error={errors.value?.message}
				{...register('value', {
					minLength: {
						value: 1,
						message: 'Значение должно быть не менее 1 символа!',
					},
					required: 'Значение - обязательное поле!',
				})}
			/>
			<Input
				className='mb-3'
				placeholder='Доп. информация'
				error={errors.info?.message}
				{...register('info', {
					minLength: {
						value: 3,
						message: 'Доп. информация должно быть не менее 3 символов!',
					},
				})}
			/>
			<div className='flex items-center'>
				<Button type='submit'>Изменить</Button>
				<Button
					className='ml-auto'
					type='button'
					variant='outline'
					onClick={() => deleteValue(value.id)}
				>
					Удалить
				</Button>
			</div>
		</form>
	);
};
