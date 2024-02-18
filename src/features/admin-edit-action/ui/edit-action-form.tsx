import { FileUpload } from '@/features/file-upload/file-upload';
import { ModelAction, ModelUpdateActionDto } from '@/shared/api/generated';
import { ALL_IMAGES } from '@/shared/constants/file-types';
import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar';
import { ErrorText } from '@/shared/ui/error-text';
import { Input } from '@/shared/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Textarea } from '@/shared/ui/textarea';
import { TypographySmall } from '@/shared/ui/typography';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useEditActionApi } from '../api/edit-action-api';
import { Checkbox } from '@/shared/ui/checkbox';
import { Label } from '@/shared/ui/label';

type FormState = Omit<ModelUpdateActionDto, 'end_date'> & {
	end_date: Date;
};

export const EditActionForm = ({
	action,
}: {
	action: ModelAction;
}): JSX.Element => {
	const {
		control,
		formState: { errors },
		register,
		handleSubmit,
	} = useForm<FormState>({
		mode: 'onChange',
		defaultValues: {
			description: action.description,
			end_date: new Date(action.end_date),
			img_path: action.img_path,
			is_activated: action.is_activated,
			title: action.title,
		},
	});

	const editAction = useEditActionApi();

	const onSubmit: SubmitHandler<FormState> = async data => {
		editAction({
			dto: {
				end_date: data.end_date.toISOString(),
				title: data.title,
				description: data.description ? data.description : undefined,
				img_path: data.img_path ? data.img_path : undefined,
				is_activated: data.is_activated,
			},
			id: action.id,
		});
	};

	const currentDate = new Date();
	currentDate.setDate(currentDate.getDate() + 1);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='mb-2'>
			<Input
				placeholder='Название'
				className='mb-3'
				error={errors.title?.message}
				{...register('title', {
					required: 'Название - обязательный параметр!',
					minLength: {
						value: 3,
						message: 'Название должно быть не менее 3 символов!',
					},
				})}
			/>
			<Textarea
				placeholder='Описание'
				className='mb-3'
				error={errors.description?.message}
				{...register('description', {
					minLength: {
						value: 10,
						message: 'Описание должно быть не менее 10 символов!',
					},
				})}
			/>
			<Controller
				control={control}
				name='img_path'
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
			<div className='mb-3'>
				<TypographySmall className='mb-2 block'>
					Дата окончания:
				</TypographySmall>
				<Controller
					control={control}
					name='end_date'
					rules={{ required: 'Дата окончания обязательное поле!' }}
					render={({ field }) => (
						<Popover>
							<PopoverTrigger asChild>
								<Button type='button' variant='outline' className='text-left'>
									{field.value
										? field.value.toLocaleDateString()
										: 'Выберите дату'}
								</Button>
							</PopoverTrigger>
							<PopoverContent align='start'>
								<Calendar
									mode='single'
									selected={field.value}
									onSelect={field.onChange}
									disabled={{ before: currentDate }}
								/>
							</PopoverContent>
						</Popover>
					)}
				/>
				<ErrorText error={errors.end_date?.message} className='block' />
			</div>
			<div className='flex items-center mb-3'>
				<Controller
					control={control}
					name='is_activated'
					render={({ field }) => (
						<Checkbox
							id={`${action.id}-edit-checkbox`}
							checked={field.value}
							onCheckedChange={field.onChange}
						/>
					)}
				/>

				<Label htmlFor={`${action.id}-edit-checkbox`} className='ml-2'>
					Активировано
				</Label>
			</div>
			<Button>Редактировать</Button>
		</form>
	);
};
