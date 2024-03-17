import { FeedbackView } from '@/features/admin/feedback/feedback-list/ui/feedback-view';
import { Meta } from '@/shared/meta/meta';
import { AdminLayout } from '@/widgets/layout/admin-layout';

const AdminFeedbackHome = (): JSX.Element => {
	return (
		<Meta title='Админ-панель | Отзывы' noIndex>
			<AdminLayout>
				<FeedbackView />
			</AdminLayout>
		</Meta>
	);
};

export default AdminFeedbackHome;
