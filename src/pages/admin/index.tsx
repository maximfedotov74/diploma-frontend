import { withLayout } from '@/layout/with-layout';
import { FC } from 'react';

const AdminHome: FC = (): JSX.Element => {
	return (
		<div>
			<h1>AdminHome</h1>
		</div>
	);
};
export default withLayout(AdminHome, 'admin');
