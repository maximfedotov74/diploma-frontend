import { AdminLayout } from '@/widgets/layout/admin-layout';

import { Meta } from '@/shared/meta/meta';
import { AddProduct } from '@/features/add-product/add-product';

import { useRouter } from 'next/router';
import { ProductList } from '@/features/product-list/product-list';
import { useGetAdminProductApi } from '@/shared/api/queries/get-admin-product-api';
import { ProductListPagination } from '@/features/product-list/product-list-pagination';

const AdminProductsHome = (): JSX.Element => {
	const router = useRouter();

	let page = 1;

	if (!isNaN(Number(router.query.page))) {
		page = Number(router.query.page);
	}

	const { data } = useGetAdminProductApi(page);

	const pages = data?.total ? Math.ceil(data?.total / 8) : 1;

	return (
		<Meta title='Админ-панель | Товары' noIndex>
			<AdminLayout>
				<AddProduct />
				<ProductList products={data?.products || []} />
				<ProductListPagination page={page} pages={pages} className='mt-4' />
			</AdminLayout>
		</Meta>
	);
};

export default AdminProductsHome;
