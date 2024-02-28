import { AdminLayout } from '@/widgets/layout/admin-layout';

import { Meta } from '@/shared/meta/meta';
import { AdminProductHome } from '@/features/admin/product/admin-product-list/ui/admin-product-home';

const AdminProducts = (): JSX.Element => {
	return (
		<Meta title='Админ-панель | Товары' noIndex>
			<AdminLayout>
				<AdminProductHome />
			</AdminLayout>
		</Meta>
	);
};

export default AdminProducts;
