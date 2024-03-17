import { Skeleton } from './skeleton';

export const OrderItemSkeleton = (): JSX.Element => {
	return (
		<div className='mb-3 last:mb-0'>
			<Skeleton className='h-6 mb-1' />
			<Skeleton className='h-6 mb-1' />
			<div className='flex items-center'>
				{Array.from({ length: 3 }).map((_, idx) => (
					<Skeleton key={idx} className='h-[105px] w-[75px] mr-3 last:mr-0' />
				))}
			</div>
		</div>
	);
};
