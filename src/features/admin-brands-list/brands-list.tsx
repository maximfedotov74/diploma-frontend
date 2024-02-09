import { useGetAllBrands } from '@/shared/api/queries/get-all-brands';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import Image from 'next/image';
import { EditBrand } from '../admin-edit-brand/ui/edit-brand';

export const BrandsList = (): JSX.Element => {
	const { data: brands } = useGetAllBrands();

	return (
		<div className='grid grid-cols-1 xs:grid-cols-2 gap-3 md:grid-cols-3 md:gap-4'>
			{brands?.map(brand => (
				<Card key={brand.id} className='relative py-4'>
					<CardHeader className='pt-0'>
						<CardTitle>{brand.title}</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='flex items-center justify-center'>
							<Image
								className='rounded-lg w-[210px] h-[190px]'
								width={300}
								height={300}
								alt={brand.title}
								src={brand.img_path || '/img/brand-default.webp'}
							/>
						</div>
						<EditBrand brand={brand} />
					</CardContent>
				</Card>
			))}
		</div>
	);
};
