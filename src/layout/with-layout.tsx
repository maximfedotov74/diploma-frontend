import { FunctionComponent } from 'react';
import { AdminLayout } from './admin-layout/layout';
import { PublicLayout } from './public-layout/layout';

type layout = 'admin' | 'public';

export const withLayout = <T extends Record<string, unknown>>(
	Component: FunctionComponent<T>,
	type?: layout
) => {
	const withLayoutComponent = (props: T) => {
		AdminLayout;
		switch (type) {
			case 'admin':
				return (
					<AdminLayout>
						<Component {...props} />
					</AdminLayout>
				);
			case 'public':
				return (
					<PublicLayout>
						<Component {...props} />
					</PublicLayout>
				);
			default:
				return (
					<PublicLayout>
						<Component {...props} />
					</PublicLayout>
				);
		}
	};
	return withLayoutComponent;
};
