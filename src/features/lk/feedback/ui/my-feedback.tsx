import { TypographyH1, TypographyP } from '@/shared/ui/typography';
import { useGetMyFeedback } from '../api/get-my-feedback';
import Image from 'next/image';
import { Link } from '@/shared/ui/link';
import { PRODUCT_ROUTE } from '@/shared/constants/routes/public';
import { cn } from '@/shared/utils/cn';
import { Skeleton } from '@/shared/ui/skeleton';

export const MyFeedback = (): JSX.Element => {
	const { data, isLoading } = useGetMyFeedback();
	return (
		<div className='mb-10'>
			<div className='text-2xl mb-5'>Отзывы: {data?.length}</div>
			<div>
				{isLoading ? (
					<>
						{Array.from({ length: 6 }).map((_, idx) => (
							<div className='sm:flex mb-4 last:mb-0' key={idx}>
								<Skeleton className='w-[140px] h-[200px] sm:mr-2 sm:mb-0 mb-2' />
								<div className='w-full'>
									<Skeleton className='block mb-2 h-4 max-w-[200px]' />
									<Skeleton className='block mb-2 h-4 max-w-[200px]' />
									<Skeleton className='block mb-2 h-4 max-w-[200px]' />
									<Skeleton className='block mb-2 h-4 max-w-[200px]' />
									<Skeleton className='block mb-2 h-4 max-w-[200px]' />
									<Skeleton className='block mb-2 h-4 max-w-[200px]' />
									<Skeleton className='block h-4 max-w-[200px]' />
								</div>
							</div>
						))}
					</>
				) : (
					data?.map(item => (
						<div key={item.id} className='sm:flex mb-4 last:mb-0'>
							<Link
								key={item.id}
								href={`${PRODUCT_ROUTE}/${item.model.slug}`}
								className='sm:mr-2 sm:mb-0 mb-2 w-[140px] h-[200px] block'
							>
								<Image
									alt={item.product.title}
									src={item.model.image_path}
									width={140}
									height={200}
									className='w-[140px] h-[200px]'
								/>
							</Link>
							<div>
								<div
									className={cn('text-sm mb-2', {
										'text-action': item.is_hidden,
										'text-green-500': !item.is_hidden,
									})}
								>
									{item.is_hidden ? 'Неопубликован' : 'Опубликован'}
								</div>
								<div className='mb-2 text-sm'>{item.product.title}</div>
								<div className='mb-2 text-sm'>{item.product.brand.title}</div>
								<div className='mb-2 text-sm'>
									{item.product.category.short_title}
								</div>
								<div className='mb-2 text-sm'>Оценка: {item.rate}</div>
								<div className='text-sm text-foreground/60 mb-2'>
									{new Date(item.created_at).toLocaleString('RU-ru', {
										year: 'numeric',
										day: 'numeric',
										month: 'long',
									})}
								</div>
								<TypographyP>{item.text}</TypographyP>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};
