import {
	ModelLoginDto,
	getApiUser,
	postApiAuthLogin,
} from '@/shared/api/generated';
import { validEmail } from '@/shared/constants/regexp';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { PasswordInput } from '@/shared/ui/password-input';
import { Separator } from '@/shared/ui/separator';
import { TypographyH1 } from '@/shared/ui/typography';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';

const LkPage = (): JSX.Element => {
	const qc = useQueryClient();

	const { mutateAsync: login } = useMutation({
		mutationKey: ['login'],
		mutationFn: (dto: ModelLoginDto) => postApiAuthLogin(dto),
	});

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<ModelLoginDto>({ mode: 'onChange' });

	const onSubmit: SubmitHandler<ModelLoginDto> = async data => {
		await login(data);
		qc.invalidateQueries({ queryKey: ['session'] });
	};

	const { data: session } = useQuery({
		queryKey: ['session'],
		queryFn: () => getApiUser(),
	});

	return (
		<div className='p-20'>
			<TypographyH1 className='mb-4'>Вход в систему</TypographyH1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					placeholder='Email'
					type='email'
					className='mb-3'
					{...register('email', {
						required: 'Email - обязательное поле!',
						pattern: {
							value: validEmail,
							message: 'Некорректный формат email!',
						},
					})}
					error={errors.email?.message}
				/>
				<PasswordInput
					placeholder='Пароль'
					className='mb-3'
					{...register('password', {
						required: 'Пароль - обязательное поле!',
						minLength: {
							value: 6,
							message: 'Длина пароля должна быть не менее 6 символов!',
						},
					})}
					error={errors.password?.message}
				/>
				<Button>Вход</Button>
			</form>
			<Separator className='my-4' />
			{session && <div>{JSON.stringify(session)}</div>}
		</div>
	);
};

export default LkPage;
