import { ModelCreateOptionValueDto, ModelOption } from '@/shared/api/generated';
import { useAddValue } from '../api/add-value-api';
import { Button } from '@/shared/ui/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/shared/ui/input';

export const AdminAddValueForm = ({
	option,
}: {
	option: ModelOption;
}): JSX.Element => {
	const {
		handleSubmit,
		reset,
		register,
		formState: { errors },
	} = useForm<ModelCreateOptionValueDto>({ mode: 'onChange' });

	const addValue = useAddValue(option.id);

	const onSubmit: SubmitHandler<ModelCreateOptionValueDto> = async data => {
		await addValue({
			option_id: option.id,
			value: data.value,
			info: data.info ? data.info : undefined,
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
			<Button>Создать</Button>
		</form>
	);
};
