import { FileUpload } from '@/features/file-upload/file-upload';
import {
	ModelUpdateUserDto,
	ModelUser,
	ModelUserGender,
} from '@/shared/api/generated';
import { ALL_IMAGES } from '@/shared/constants/file-types';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useEditProfileApi } from '../api/edit-profile-api';

export const EditProfileForm = ({ profile }: { profile: ModelUser }) => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<ModelUpdateUserDto>({
		mode: 'onChange',
		defaultValues: {
			avatar_path: profile.avatar_path || '/img/default-avatar.jpg',
			first_name: profile.first_name,
			gender: profile.gender,
			last_name: profile.last_name,
			patronymic: profile.patronymic,
		},
	});

	const editProfile = useEditProfileApi();

	const onSumbit: SubmitHandler<ModelUpdateUserDto> = async data => {
		await editProfile({
			avatar_path: data.avatar_path,
			first_name: data.first_name,
			gender: data.gender,
			last_name: data.last_name,
			patronymic: data.patronymic,
		});
	};

	return (
		<form onSubmit={handleSubmit(onSumbit)} className='mb-5'>
			<Controller
				control={control}
				name='avatar_path'
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
			<Input
				placeholder='Фамилия'
				className='mb-3'
				error={errors.last_name?.message}
				{...register('last_name', {
					minLength: {
						value: 3,
						message: 'Фамилия должна быть не менее 3 символов!',
					},
				})}
			/>
			<Input
				placeholder='Имя'
				className='mb-3'
				error={errors.first_name?.message}
				{...register('first_name', {
					minLength: {
						value: 1,
						message: 'Имя должно быть не менее 1 символа!',
					},
				})}
			/>
			<Input
				placeholder='Отчество'
				className='mb-3'
				error={errors.last_name?.message}
				{...register('patronymic', {
					minLength: {
						value: 3,
						message: 'Отчество должно быть не менее 3 символов!',
					},
				})}
			/>
			<Controller
				control={control}
				name='gender'
				render={({ field }) => (
					<RadioGroup
						onValueChange={field.onChange}
						value={field.value}
						className='mb-3'
					>
						<div className='flex items-center'>
							<RadioGroupItem
								value={ModelUserGender.men}
								id={ModelUserGender.men}
							/>
							<Label htmlFor={ModelUserGender.men} className='ml-2'>
								Мужской
							</Label>
						</div>
						<div className='flex items-center'>
							<RadioGroupItem
								value={ModelUserGender.women}
								id={ModelUserGender.women}
							/>
							<Label htmlFor={ModelUserGender.women} className='ml-2'>
								Женский
							</Label>
						</div>
					</RadioGroup>
				)}
			/>
			<Button>Сохранить</Button>
		</form>
	);
};
