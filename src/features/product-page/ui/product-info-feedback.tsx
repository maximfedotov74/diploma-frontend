import { useGetModelFeedbackApi } from '@/shared/api/queries/get-model-feedback';
import { AddFeedback } from './add-feedback';
import { Separator } from '@/shared/ui/separator';

export const ProductInfoFeedback = ({
	modelId,
}: {
	modelId: number;
}): JSX.Element => {
	const { data: feedback } = useGetModelFeedbackApi(modelId);

	return (
		<>
			<div className=''>
				<div className='font-medium text-xl'>
					Количество отзывов: {feedback?.rate_count ?? 0}
				</div>
				<div className='font-medium text-xl mb-2'>
					Средняя оценка: {feedback?.avg_rate ?? 0}
				</div>
				<AddFeedback modelId={modelId} />

				<div>
					{feedback?.feedback.map(f => (
						<div key={f.id}>
							<div>{f.user.first_name || `Пользователь ${f.user.id}`}</div>
							<div className='text-foreground/60'>
								{new Date(f.created_at).toLocaleDateString('RU-ru', {
									month: 'long',
									day: 'numeric',
									year: 'numeric',
								})}
							</div>
							<div>Оценка: {f.rate}</div>
							<p>{f.text}</p>
							<Separator className='my-2' />
						</div>
					))}
				</div>
			</div>
		</>
	);
};
