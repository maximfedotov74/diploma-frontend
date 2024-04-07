import { TypographyP } from '@/shared/ui/typography';
import Image from 'next/image';
import { Link } from '@/shared/ui/link';
import { PRODUCT_ROUTE } from '@/shared/constants/routes/public';
import { cn } from '@/shared/utils/cn';
import { ModelUserFeedback } from '../api/generated';
export const FeedbackItem = ({
	item,
	className,
}: {
	item: ModelUserFeedback;
	className?: string;
}): JSX.Element => {
	return (
		<div className={cn('sm:flex', className)}>
			<Link
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
				<div className='mb-2 text-sm'>{item.product.category.short_title}</div>
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
	);
};
