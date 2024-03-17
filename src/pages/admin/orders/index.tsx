import { OrdersView } from '@/features/admin/orders/orders-list/ui/orders-view';
import { Meta } from '@/shared/meta/meta';
import { AdminLayout } from '@/widgets/layout/admin-layout';

const AdminOrdersHome = (): JSX.Element => {
	return (
		<Meta title='Админ-панель | Заказы' noIndex>
			<AdminLayout>
				<OrdersView />
			</AdminLayout>
		</Meta>
	);
};

export default AdminOrdersHome;
