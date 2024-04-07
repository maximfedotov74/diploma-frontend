import { AdminLayout } from '@/widgets/layout/admin-layout';
import { Meta } from '@/shared/meta/meta';
import { RolesList } from '@/features/admin/roles/roles-list/ui/roles-list';
import { CreateRole } from '@/features/admin/roles/create-role/ui/create-role';

const AdminRoles = (): JSX.Element => {
	return (
		<Meta title='Админ-панель | Роли' noIndex>
			<AdminLayout>
				<CreateRole />
				<RolesList />
			</AdminLayout>
		</Meta>
	);
};

export default AdminRoles;
