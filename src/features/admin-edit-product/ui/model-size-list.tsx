import { useGetModelSizesApi } from '@/features/admin-edit-product/api/get-model-sizes-api';
import { ModelAdminProductModelRelation } from '@/shared/api/generated';
import { useDeleteModelSizeApi } from '../api/delete-model-size-api';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';

export const ModelSizeList = ({
	model,
}: {
	model: ModelAdminProductModelRelation;
}): JSX.Element => {
	const { data: sizes } = useGetModelSizesApi(model.id);

	const deleteModelSize = useDeleteModelSizeApi(model.id);

	return (
		<div className='grid grid-cols-6 gap-2'>
			{sizes?.map(size => (
				<div
					key={size.size_model_id}
					className='border border-primary p-2 rounded-md relative'
				>
					<div>Размер: {size.size_value}</div>
					<div>Литерал: {size.literal}</div>
					<div>В наличии: {size.in_stock}</div>
					<Button
						variant='ghost'
						size='icon'
						className='h-5 w-5 absolute top-1 right-1'
						onClick={() => deleteModelSize(size.size_model_id)}
					>
						<Icon icon='cancel_16' />
					</Button>
				</div>
			))}
		</div>
	);
};
