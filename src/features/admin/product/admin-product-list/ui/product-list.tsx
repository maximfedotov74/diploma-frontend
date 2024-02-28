import { ModelAdminProduct } from '@/shared/api/generated';
import {
	ADMIN_BRAND_ROUTE,
	ADMIN_CATEGORY_ROUTE,
} from '@/shared/constants/routes/admin';

import { Link } from '@/shared/ui/link';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/shared/ui/table';

import dynamic from 'next/dynamic';

const EditProduct = dynamic(
	() =>
		import('@/features/admin/product/admin-edit-product/ui/edit-product').then(
			module => module.EditProduct
		),
	{
		ssr: false,
		loading: () => <div>Loading...</div>,
	}
);

export const ProductList = ({
	products,
}: {
	products: ModelAdminProduct[];
}): JSX.Element => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className='w-[100px] px-2'>ID</TableHead>
					<TableHead className='px-2'>Название</TableHead>
					<TableHead className='px-2'>Категория</TableHead>
					<TableHead className='px-2'>Бренд</TableHead>
					<TableHead className='text-right px-2'></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{products.map(item => (
					<TableRow key={item.id}>
						<TableCell className='font-medium p-2'>{item.id}</TableCell>
						<TableCell className='break-words p-2 max-w-[120px]'>
							{item.title}
						</TableCell>
						<TableCell className='p-2'>
							<Link
								href={`${ADMIN_CATEGORY_ROUTE}/?opened=${item.category.slug}`}
								variant='menu'
							>
								{item.category.title}
							</Link>
						</TableCell>
						<TableCell className='p-2 text-left'>
							<Link
								href={`${ADMIN_BRAND_ROUTE}/?opened=${item.brand.slug}`}
								variant='menu'
							>
								{item.brand.title}
							</Link>
						</TableCell>
						<TableCell className='p-2'>
							<EditProduct product={item} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
