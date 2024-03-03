import {
	ModelActionGender,
	ModelCreateActionDto,
} from '@/shared/api/generated';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAddActionApi } from '../api/add-action-api';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { FileUpload } from '@/features/file-upload/file-upload';
import { ALL_IMAGES } from '@/shared/constants/file-types';
import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar';
import { TypographySmall } from '@/shared/ui/typography';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { ErrorText } from '@/shared/ui/error-text';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui/select';
import { genderTranslate } from '@/shared/translation';

type FormState = Omit<ModelCreateActionDto, 'end_date'> & {
	end_date: Date;
};

export const AdminAddActionForm = (): JSX.Element => {
	const {
		control,
		formState: { errors },
		register,
		handleSubmit,
		reset,
	} = useForm<FormState>({ mode: 'onChange' });
	const createAction = useAddActionApi();

	const onSubmit: SubmitHandler<FormState> = async data => {
		await createAction({
			end_date: data.end_date.toISOString(),
			title: data.title,
			description: data.description ? data.description : undefined,
			img_path: data.img_path ? data.img_path : undefined,
			gender: data.gender,
		});
		reset();
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
			<Controller
				control={control}
				name='gender'
				rules={{
					required: 'Категория акции - обязательное поле!',
				}}
				render={({ field }) => (
					<div className='mb-3'>
						<Select
							defaultValue={field.value?.toString()}
							onValueChange={field.onChange}
						>
							<SelectTrigger className='w-[180px]'>
								<SelectValue placeholder='Категория акции' />
							</SelectTrigger>
							<SelectContent>
								{Object.values(ModelActionGender).map(gender => (
									<SelectItem key={gender} value={gender}>
										{genderTranslate[gender]}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<ErrorText error={errors.gender?.message} />
					</div>
				)}
			/>
			<Button>Создать</Button>
		</form>
	);
};
