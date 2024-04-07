import { useGetMyFeedback } from '../api/get-my-feedback';
import { Skeleton } from '@/shared/ui/skeleton';
import { FeedbackItem } from '@/shared/ui/feedback-item';

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
						<FeedbackItem
							item={item}
							className='mb-4 last:mb-0'
							key={item.id}
						/>
					))
				)}
			</div>
		</div>
	);
};
