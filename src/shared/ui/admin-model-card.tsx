import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { ModelAdminProductModelRelation } from '../api/generated';
import Image from 'next/image';
import { TypographySmall } from './typography';
import { parsePriceRUB } from '../utils/parse-price';
import { ReactNode } from 'react';

export const AdminModelCard = ({
	m,
	actions,
}: {
	m: ModelAdminProductModelRelation;
	actions?: ReactNode;
}): JSX.Element => {
	return (
		<Card key={m.id}>
			<CardHeader className='p-2'>
				<CardTitle className='text-lg'>Артикул: {m.article}</CardTitle>
			</CardHeader>
			<CardContent className='flex flex-col items-center pb-2 relative'>
				{actions && (
					<div className='sm:absolute top-2 right-1 flex sm:flex-col'>
						{actions}
					</div>
				)}
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
	);
};
