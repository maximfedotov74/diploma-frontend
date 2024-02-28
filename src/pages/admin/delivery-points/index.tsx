import { AddDeliverypoint } from '@/features/admin/delivery-point/admin-add-delivery-point/ui/admin-add-delivery-point';
import { AdminDeliveryPointList } from '@/features/admin/delivery-point/admin-delivery-point-list/admin-delivery-point-list';
import { Meta } from '@/shared/meta/meta';
import { AdminLayout } from '@/widgets/layout/admin-layout';

const AdminDeliveryPoints = (): JSX.Element => {
	return (
		<Meta title='Админ-панель | Пункты выдачи' noIndex>
			<AdminLayout>
				<AddDeliverypoint />
				<AdminDeliveryPointList />
			</AdminLayout>
		</Meta>
	);
};

export default AdminDeliveryPoints;
