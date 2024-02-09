import { useGetAdminProductApi } from '@/features/admin-product-home/get-admin-product-api';
import { useRouter } from 'next/router';
import { AddProduct } from '../admin-add-product/ui/add-product';
import { ProductList } from '../admin-product-list/product-list';
import { ProductListPagination } from '../admin-product-list/product-list-pagination';

export const AdminProductHome = (): JSX.Element => {
	const router = useRouter();

	let page = 1;

	if (!isNaN(Number(router.query.page))) {
		page = Number(router.query.page);
	}

	const { data } = useGetAdminProductApi(page);

	const pages = data?.total ? Math.ceil(data?.total / 8) : 1;
	return (
		<>
			<AddProduct />
			<ProductList products={data?.products || []} />
			<ProductListPagination page={page} pages={pages} className='mt-4' />
		</>
	);
};
