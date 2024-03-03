import { ModelAction } from '@/shared/api/generated';
import { useGetAllActionModels } from '@/shared/api/queries/get-action-models';
import { AdminModelCard } from '@/shared/ui/admin-model-card';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { useDeleteActionModelApi } from '../api/delete-action-model-api';

export const ActionModelList = ({
	action,
}: {
	action: ModelAction;
}): JSX.Element => {
	const { data: models } = useGetAllActionModels(action.id);

	const deleteActionModel = useDeleteActionModelApi(action.id);

	return (
		<>
			<div className='font-bold text-lg mb-2'>Модели:</div>
			<div className='grid grid-cols-1 xs:grid-cols-2 gap-3 md:grid-cols-3 md:gap-4'>
				{models?.map(m => (
					<AdminModelCard
						key={m.model_id}
						m={{
							article: m.article,
							id: m.model_id,
							image_path: m.model_main_image_path,
							price: m.model_price,
							product_id: m.product_id,
							slug: m.product_slug,
							discount: m.model_discount,
						}}
						actions={
							<Button
								variant='ghost'
								size='icon'
								onClick={() => deleteActionModel(m.action_model_id)}
							>
								<Icon icon='delete_outline_24' className='w-5 h-5' />
							</Button>
						}
					/>
				))}
			</div>
		</>
	);
};
