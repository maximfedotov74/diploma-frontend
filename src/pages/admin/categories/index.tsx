import { AddCategory } from '@/features/admin/category/admin-add-category/ui/add-category';
import { CategoriesList } from '@/features/admin/category/admin-categories-list/categories-list';
import { AdminInitialCategory } from '@/features/admin/category/admin-initial-category/admin-initial-category';
import { Meta } from '@/shared/meta/meta';
import { AdminLayout } from '@/widgets/layout/admin-layout';

const AdminCategoriesHome = (): JSX.Element => {
	return (
		<Meta title='Админ-панель | Категории' noIndex>
			<AdminLayout>
				<AdminInitialCategory />
				<AddCategory />
				<CategoriesList />
			</AdminLayout>
		</Meta>
	);
};

export default AdminCategoriesHome;
