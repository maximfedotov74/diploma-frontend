import { ModelFeedback } from '@/shared/api/generated';
import { ADMIN_PRODUCTS_ROUTE } from '@/shared/constants/routes/admin';
import { Link } from '@/shared/ui/link';
import { TypographyP, TypographySmall } from '@/shared/ui/typography';
import { useToggleFeedbackHidden } from '../api/toggle-feedback-hidden';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { useDeleteFeedback } from '../api/delete-feedback';

const FeedbackListItem = ({ item }: { item: ModelFeedback }) => {
	const toggleHidden = useToggleFeedbackHidden();
	const deleteFeedback = useDeleteFeedback();

	return (
		<div className='mb-3 last:mb-0'>
			<div>
				Дата:{' '}
				{new Date(item.created_at).toLocaleString('RU-ru', {
					year: 'numeric',
					day: 'numeric',
					month: 'long',
				})}
			</div>
			<div>Клиент: {item.user.email}</div>
			<div>Оценка: {item.rate}</div>
			<Link
				variant='secondary'
				href={`${ADMIN_PRODUCTS_ROUTE}?opened=${item.model_id}`}
			>
				Модель товара
			</Link>
			<TypographyP>{item.text}</TypographyP>
			<div className='flex items-center justify-between'>
				<Button variant='outline' onClick={() => toggleHidden(item.id)}>
					<TypographySmall>
						{item.is_hidden ? 'Показать' : 'Скрыть'}
					</TypographySmall>
					<Icon
						icon={item.is_hidden ? 'view_outline_20' : 'hide_outline_20'}
						className='ml-2 h-5 w-5'
					/>
				</Button>
				<Button
					variant='outline'
					size='icon'
					onClick={() => deleteFeedback(item.id)}
				>
					<Icon icon='delete_outline_24' className='h-5 w-5' />
				</Button>
			</div>
		</div>
	);
};

export const FeedbackList = ({
	feedback,
}: {
	feedback: ModelFeedback[];
}): JSX.Element => {
	return (
		<div className='mb-10'>
			{feedback.map(f => (
				<FeedbackListItem key={f.id} item={f} />
			))}
		</div>
	);
};
