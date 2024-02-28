import { AdminActionsList } from '@/features/admin/action/admin-actions-list/admin-actions-list';
import { AddAction } from '@/features/admin/action/admin-add-action/ui/admin-add-action';
import { Meta } from '@/shared/meta/meta';
import { AdminLayout } from '@/widgets/layout/admin-layout';

const AdminActions = () => {
	return (
		<Meta title='Админ-панель | Акции' noIndex>
			<AdminLayout>
				<AddAction />
				<AdminActionsList />
			</AdminLayout>
		</Meta>
	);
};

export default AdminActions;
