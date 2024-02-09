import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { useGetAdminProductModelsApi } from '../api/get-admin-product-models-api';
import Image from 'next/image';
import { TypographySmall } from '@/shared/ui/typography';
import { parsePriceRUB } from '@/shared/utils/parse-price';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { useDeleteProductModelApi } from '../api/delete-model-product-api';
import { EditModelProduct } from './edit-model-product';

export const ModelsList = ({ id }: { id: number }): JSX.Element => {
	const { data } = useGetAdminProductModelsApi(id);
	const { deleteProductModel } = useDeleteProductModelApi(id);
	return (
		<div className='grid grid-cols-1 xs:grid-cols-2 gap-3 md:grid-cols-3 md:gap-4'>
			{data?.map(m => (
				<Card key={m.id}>
					<CardHeader className='p-2'>
						<CardTitle className='text-lg'>Артикул: {m.article}</CardTitle>
					</CardHeader>
					<CardContent className='flex flex-col items-center pb-2 relative'>
						<div className='sm:absolute top-2 right-1 flex sm:flex-col'>
							<Button
								variant='ghost'
								size='icon'
								onClick={() => deleteProductModel(m.id)}
							>
								<Icon icon='delete_outline_24' className='w-5 h-5' />
							</Button>

							<EditModelProduct model={m} />
						</div>
						<Image
							width={150}
							height={150}
							src={m.image_path}
							alt={`product-model with article ${m.article}`}
						/>
						<div className='mt-3 flex flex-col'>
							<TypographySmall className='mb-1'>
								Цена: {parsePriceRUB(m.price)}
							</TypographySmall>
							{m.discount && (
								<TypographySmall>Скидка %: {m.discount}</TypographySmall>
							)}
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
};
