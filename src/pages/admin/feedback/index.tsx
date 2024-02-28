import { Meta } from '@/shared/meta/meta';
import { AdminLayout } from '@/widgets/layout/admin-layout';

const AdminFeedbackHome = (): JSX.Element => {
	return (
		<Meta title='Админ-панель | Отзывы' noIndex>
			<AdminLayout>Отзывы</AdminLayout>
		</Meta>
	);
};

export default AdminFeedbackHome;
