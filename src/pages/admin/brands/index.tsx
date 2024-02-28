import { AddBrand } from '@/features/admin/brand/admin-add-brand/ui/add-brand';
import { BrandsList } from '@/features/admin/brand/admin-brands-list/brands-list';
import { AdminInitialBrand } from '@/features/admin/brand/admin-initial-brand/admin-initial-brand';
import { Meta } from '@/shared/meta/meta';
import { AdminLayout } from '@/widgets/layout/admin-layout';

const AdminBrandsHome = (): JSX.Element => {
	return (
		<Meta title='Админ-панель | Бренды' noIndex>
			<AdminLayout>
				<AdminInitialBrand />
				<AddBrand />
				<BrandsList />
			</AdminLayout>
		</Meta>
	);
};

export default AdminBrandsHome;
