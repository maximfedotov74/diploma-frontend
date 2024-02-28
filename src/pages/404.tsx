import { Meta } from '@/shared/meta/meta';
import { Link } from '@/shared/ui/link';
import { TypographyP } from '@/shared/ui/typography';
import { AuthLayout } from '@/widgets/layout/auth-layout';
import Image from 'next/image';

const NotFound = (): JSX.Element => {
	return (
		<Meta
			title='Страница не найдено'
			description='Страница не найдено. Страница  недоступна или не существует'
		>
			<AuthLayout>
				<div className='flex flex-col items-center md:flex-row mt-20'>
					<h1 className='invisible'></h1>
					<Image
						className='sm:w-full md:w-2/3 md:mr-6 h-60 md:h-80 lg:h-96'
						width={450}
						height={450}
						src='/img/404.svg'
						alt='Страница не найдена!'
					/>
					<div>
						<TypographyP className='mb-5'>
							Мы не смогли найти страницу по вашему запросу
						</TypographyP>
						<Link href='/' variant='secondary' className='block'>
							Вернуться на главную страницу
						</Link>
					</div>
				</div>
			</AuthLayout>
		</Meta>
	);
};

export default NotFound;
