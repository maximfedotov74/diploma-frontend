import { AdminLayout } from '@/widgets/layout/admin-layout';
import { TypographyH1 } from '@/shared/ui/typography';
import { Meta } from '@/shared/meta/meta';

const AdminStats = (): JSX.Element => {
	return (
		<Meta title='Админ-панель' noIndex>
			<AdminLayout>
				<TypographyH1>AdminStats Page</TypographyH1>
			</AdminLayout>
		</Meta>
	);
};

export default AdminStats;
