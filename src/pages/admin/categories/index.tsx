import { AddCategory } from '@/features/admin-add-category/ui/add-category';
import { CategoriesList } from '@/features/admin-categories-list/categories-list';
import { Meta } from '@/shared/meta/meta';
import { AdminLayout } from '@/widgets/layout/admin-layout';

const AdminCategoriesHome = (): JSX.Element => {
	return (
		<Meta title='Админ-панель | Категории' noIndex>
			<AdminLayout>
				<AddCategory />
				<CategoriesList />
			</AdminLayout>
		</Meta>
	);
};

export default AdminCategoriesHome;
