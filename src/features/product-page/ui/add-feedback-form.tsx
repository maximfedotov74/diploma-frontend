import { ModelAddFeedbackDto } from '@/shared/api/generated';
import { Button } from '@/shared/ui/button';
import { ErrorText } from '@/shared/ui/error-text';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui/select';
import { Textarea } from '@/shared/ui/textarea';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAddFeedbackApi } from '../api/add-feedback-api';
import Image from 'next/image';

export const AddFeedbackForm = ({
	modelId,
	closeDialog,
}: {
	modelId: number;
	closeDialog: () => void;
}): JSX.Element => {
	const {
		control,
		formState: { errors },
		register,
		handleSubmit,
	} = useForm<ModelAddFeedbackDto>({ mode: 'onChange' });

	const { addFeedback, isSuccess } = useAddFeedbackApi(modelId);

	const onSubmit: SubmitHandler<ModelAddFeedbackDto> = async data => {
		await addFeedback({
			model_id: modelId,
			rate: +data.rate,
			text: data.text,
		});
	};

	if (isSuccess) {
		return (
			<div className='flex flex-col items-center'>
				<Image
					alt='Отзыв отправлен'
					src='/img/feedback-added.svg'
					width={140}
					height={140}
					className='h-[120px] w-[120px] mb-3'
				/>
				<div className='text-xl mb-2'>Отзыв отправлен</div>
				<div className='mb-2 text-sm'>
					Служба поддержки проверит и опубликует ваш отзыв в ближайшее время.
				</div>
				<Button onClick={closeDialog} variant='outline'>
					Вернуться к покупкам
				</Button>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Textarea
				placeholder='Текст отзыва'
				className='mb-3'
				error={errors.text?.message}
				{...register('text', {
					minLength: {
						value: 10,
						message: 'Описание должно быть не менее 10 символов!',
					},
				})}
			/>
			<Controller
				control={control}
				name='rate'
				rules={{
					required: 'Оценка - обязательное поле!',
					min: {
						value: 1,
						message: 'Оценка должна быть больше нуля!',
					},
					max: {
						value: 5,
						message: 'Максимальное значение оценки 5!',
					},
				}}
				render={({ field }) => (
					<div className='mb-3'>
						<Select
							defaultValue={field.value?.toString()}
							onValueChange={field.onChange}
						>
							<SelectTrigger className='w-[180px]'>
								<SelectValue placeholder='Оценка' />
							</SelectTrigger>
							<SelectContent>
								{Array.from({ length: 5 }, (_, idx) => (
									<SelectItem key={idx} value={(idx + 1).toString()}>
										{idx + 1}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<ErrorText error={errors.rate?.message} />
					</div>
				)}
			/>
			<Button>Отправить отзыв</Button>
		</form>
	);
};
