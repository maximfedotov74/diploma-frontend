import { AddBrand } from '@/features/admin-add-brand/ui/add-brand';
import { BrandsList } from '@/features/admin-brands-list/brands-list';
import { Meta } from '@/shared/meta/meta';
import { AdminLayout } from '@/widgets/layout/admin-layout';

const AdminBrandsHome = (): JSX.Element => {
	return (
		<Meta title='Админ-панель | Бренды' noIndex>
			<AdminLayout>
				<AddBrand />
				<BrandsList />
			</AdminLayout>
		</Meta>
	);
};

export default AdminBrandsHome;
