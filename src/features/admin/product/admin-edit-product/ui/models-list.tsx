import { useGetAdminProductModelsApi } from '../api/get-admin-product-models-api';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { useDeleteProductModelApi } from '../api/delete-model-product-api';
import { EditModelProduct } from './edit-model-product';
import { AdminModelCard } from '@/shared/ui/admin-model-card';

export const ModelsList = ({ id }: { id: number }): JSX.Element => {
	const { data } = useGetAdminProductModelsApi(id);
	const { deleteProductModel } = useDeleteProductModelApi(id);
	return (
		<div className='grid grid-cols-1 xs:grid-cols-2 gap-3 md:grid-cols-3 md:gap-4'>
			{data?.map(m => (
				<AdminModelCard
					key={m.id}
					m={m}
					actions={
						<>
							<Button
								variant='ghost'
								size='icon'
								onClick={() => deleteProductModel(m.id)}
							>
								<Icon icon='delete_outline_24' className='w-5 h-5' />
							</Button>

							<EditModelProduct className='sm:mt-2' model={m} />
						</>
					}
				/>
			))}
		</div>
	);
};
