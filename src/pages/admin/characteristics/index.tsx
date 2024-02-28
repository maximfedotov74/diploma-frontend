import { AdminCharacteristicsHome } from '@/features/admin/characteristic/admin-characteristics-home/admin-characteristics-home';
import { Meta } from '@/shared/meta/meta';
import { AdminLayout } from '@/widgets/layout/admin-layout';

const AdminCharacteristics = () => {
	return (
		<Meta title='Админ-панель | Характеристики' noIndex>
			<AdminLayout>
				<AdminCharacteristicsHome />
			</AdminLayout>
		</Meta>
	);
};

export default AdminCharacteristics;
