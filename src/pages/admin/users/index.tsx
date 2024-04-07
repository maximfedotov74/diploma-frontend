import { AdminLayout } from '@/widgets/layout/admin-layout';
import { Meta } from '@/shared/meta/meta';
import { UsersList } from '@/features/admin/users/users-list/ui/users-list';

const AdminUsers = (): JSX.Element => {
	return (
		<Meta title='Админ-панель | Клиенты' noIndex>
			<AdminLayout>
				<UsersList />
			</AdminLayout>
		</Meta>
	);
};

export default AdminUsers;
