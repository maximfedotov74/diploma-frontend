import { useEffect } from 'react';
import { useGetViews } from '../api/get-views';
import { useAddView } from '../api/add-view';
import { Icon } from '@/shared/ui/icon';

export const ModelViews = ({ modelId }: { modelId: number }): JSX.Element => {
	const { data } = useGetViews(modelId);
	const addView = useAddView();

	useEffect(() => {
		addView(modelId);
	}, [modelId, addView]);

	return (
		<div className='flex items-center'>
			<Icon icon='view_outline_20' className='h-7 w-7 mr-1' />
			<div>{data?.count}</div>
		</div>
	);
};
