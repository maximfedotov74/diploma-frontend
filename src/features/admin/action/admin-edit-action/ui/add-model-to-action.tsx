import { AdminModelSearchByArticle } from '@/features/model-search-by-article/ui/admin-model-search';
import { ModelAction } from '@/shared/api/generated';
import { useAddModelToActionApi } from '../api/add-model-to-action-api';

export const AddModelToAction = ({
	action,
}: {
	action: ModelAction;
}): JSX.Element => {
	const addModelToAction = useAddModelToActionApi(action.id);

	const actionFn = (id: number) => {
		addModelToAction({ action_id: action.id, product_model_id: id });
	};

	return (
		<div>
			<div className='font-bold text-lg mb-2'>Поиск модели</div>
			<AdminModelSearchByArticle
				className='max-h-[300px]'
				actionSection={actionFn}
			/>
		</div>
	);
};
