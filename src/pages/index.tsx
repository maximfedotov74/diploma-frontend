import { withLayout } from '@/layout/with-layout';
import { CategoryAvatar } from '@/shared/ui/avatars/category-avatar';
import { UserAvatar } from '@/shared/ui/avatars/user-avatar';

import { Badge } from '@/shared/ui/badge';
import { ProductCard } from '@/shared/widgets/cards/product-card';
import { ProgressCarousel } from '@/shared/ui/carousel/progress-carousel';
import { Input } from '@/shared/ui/form-elements/input';
import { PasswordInput } from '@/shared/ui/form-elements/password-input';
import { AppLink } from '@/shared/ui/link';
import { GetServerSideProps } from 'next';
import { WishlistBtn } from '@/shared/features/wishlist-btn';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/shared/ui/button';
import { Radio } from '@/shared/ui/form-elements/radio';
import { RadioGroup } from '@headlessui/react';

const slides = [
	{ alt: 'asdasd', src: '/img/1.webp', link: 'http://ya.ru' },
	{ alt: 'aaa', src: '/img/2.webp', link: '/' },
	{ alt: 'xxx', src: '/img/33.webp', link: '/' },
	{ alt: 'zzz', src: '/img/4.webp', link: '/' },
	{ alt: 'asda22sd', src: '/img/5.webp', link: '/' },
	{ alt: 'asda13234sd', src: '/img/6.webp', link: '/' },
];

const slidesHover = [
	{ alt: 'asdasd', path: '/img/1.webp', id: 1 },
	{ alt: 'aaa', path: '/img/2.webp', id: 2 },
	{ alt: 'xxx', path: '/img/33.webp', id: 3 },
	{ alt: 'zzz', path: '/img/4.webp', id: 4 },
];

const ps = [
	{
		images: slidesHover,
		title: 'Поло',
		price: 4500,
		id: 1,
		discount: 33,
		brand: 'Adidas',
		category: 'Поло',
	},
	{
		images: slidesHover,
		title: 'Поло',
		price: 4500,
		id: 2,
		discount: 33,
		brand: 'Adidas',
		category: 'Поло',
	},
	{
		images: slidesHover,
		title: 'Поло',
		price: 4500,
		id: 3,
		discount: 33,
		brand: 'Adidas',
		category: 'Поло',
	},
	{
		images: slidesHover,
		title: 'Поло',
		price: 4500,
		id: 4,
		discount: 33,
		brand: 'Adidas',
		category: 'Поло',
	},
	{
		images: slidesHover,
		title: 'Поло',
		price: 4500,
		id: 5,
		discount: 33,
		brand: 'Adidas',
		category: 'Поло',
	},
	{
		images: slidesHover,
		title: 'Поло',
		price: 4500,
		id: 6,
		discount: 33,
		brand: 'Adidas',
		category: 'Поло',
	},
];

const sizes = [
	{
		size_id: 1,
		model_id: 1,
		size_model_id: 1,
		literal: 'S',
		size_value: '44',
		in_stock: 100,
	},
	{
		size_id: 2,
		model_id: 1,
		size_model_id: 2,
		literal: 'M',
		size_value: '46',
		in_stock: 150,
	},
];

type SizeSelect = {
	size_model_id: number;
	size_id: number;
	literal: string;
	model_id: number;
	size_value: string;
	in_stock: number;
};

export const validEmail =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function Home() {
	const {
		handleSubmit,
		register,
		formState: { errors },
		control,
	} = useForm<{
		password: string;
		email: string;
		sex: string;
	}>({
		mode: 'onChange',
	});

	const onSubmit: SubmitHandler<{
		password: string;
		email: string;
	}> = data => {
		console.log(data);
	};

	return (
		<div>
			<div className='w-[450px]'>
				<AppLink href='/admin'>ADMIN</AppLink>
				<ProgressCarousel items={slides} />
				<Badge>-33%</Badge>
			</div>

			<div className='card-grid'>
				{ps.map(p => (
					<ProductCard key={p.id} product={p} />
				))}
			</div>

			<UserAvatar alt='федотов максим' src='/img/jason-eyes.jpg' />
			<CategoryAvatar
				alt='федотов максим'
				src='/img/06-jumpers.webp'
				type='circle'
			/>
			<br />

			<div className='mb-10'>
				<WishlistBtn modelId={5} />
			</div>
			<div className='mb-10 w-[200px]'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='mb-10'>
						<PasswordInput
							error={errors.password?.message}
							placeholder='Введите пароль'
							{...register('password', {
								required: 'Пароль обязательное поле!',
								minLength: {
									message: 'Минимальная длина - 10 символов',
									value: 10,
								},
							})}
						/>
					</div>
					<div className='mb-8'>
						<Input
							{...register('email', {
								required: 'Email обязательное поле!',
								pattern: {
									value: validEmail,
									message: 'Некорректный емайл!',
								},
							})}
							type='email'
							error={errors.email?.message}
							placeholder='Email'
						/>
					</div>
					<div className='mb-10'>
						<Controller
							control={control}
							name='sex'
							rules={{ required: 'Пол обязательное поле!' }}
							render={({ field }) => (
								<RadioGroup
									onChange={field.onChange}
									defaultValue={field.value}
								>
									<RadioGroup.Label>Пол</RadioGroup.Label>
									<RadioGroup.Option value='men'>
										{({ checked }) => (
											<Radio
												variant={checked ? 'active' : 'disable'}
												title='Мужской'
											/>
										)}
									</RadioGroup.Option>
									<RadioGroup.Option value='women'>
										{({ checked }) => (
											<Radio
												variant={checked ? 'active' : 'disable'}
												title='Женский'
											/>
										)}
									</RadioGroup.Option>
								</RadioGroup>
							)}
						/>
					</div>
					<Button className='mt-2'>отправить</Button>
				</form>
			</div>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	return {
		props: {},
	};
};

export default withLayout(Home);
