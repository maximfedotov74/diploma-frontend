import { withLayout } from '@/layout/with-layout';
import { Meta } from '@/shared/meta/meta';
import { Typography } from '@/shared/ui/typography';
import Image from 'next/image';
import { FC } from 'react';

const NotFound: FC = (): JSX.Element => {
	return (
		<Meta
			title='Страница не найдено'
			description='Страница не найдено. Страница  недоступна или не существует'
		>
			<div className='flex flex-col items-center md:flex-row mt-20'>
				<h1 className='invisible'></h1>
				<Image
					className='sm:w-full md:w-2/3 md:mr-6 h-60 md:h-80 lg:h-96'
					width={450}
					height={450}
					src='/img/404.svg'
					alt='Страница не найдена!'
				/>
				<Typography
					variant='p'
					className='md:text-xl md:mt-0 mt-6 md:self-end md:leading-8'
				>
					Мы не смогли найти страницу по вашему запросу
				</Typography>
			</div>
		</Meta>
	);
};

export default withLayout(NotFound);
