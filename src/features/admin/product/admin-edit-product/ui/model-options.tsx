import { ModelProductModel } from '@/shared/api/generated';
import { useGetModelOptionsApi } from '../api/get-model-options-api';
import { useDeleteModelOptionApi } from '../api/delete-model-option-api';
import { Icon } from '@/shared/ui/icon';
import { Button } from '@/shared/ui/button';

export const ModelOptions = ({
	model,
}: {
	model: ModelProductModel;
}): JSX.Element => {
	const { data: options } = useGetModelOptionsApi(model.id);
	const deleteModelOption = useDeleteModelOptionApi(model.id);

	return (
		<div className='grid grid-cols-4 gap-2'>
			{options?.map(opt => (
				<div
					key={opt.pmop_id}
					className='border border-primary p-3 rounded-md relative'
				>
					<div>Характеристика: {opt.title}</div>
					<div>
						{opt.values?.map(v => (
							<div key={v.id}>Значение: {v.value}</div>
						))}
					</div>
					<Button
						variant='ghost'
						size='icon'
						className='h-5 w-5 absolute top-1 right-1'
						onClick={() => deleteModelOption(opt.pmop_id)}
					>
						<Icon icon='cancel_16' />
					</Button>
				</div>
			))}
		</div>
	);
};
