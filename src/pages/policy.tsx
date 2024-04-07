import { Meta } from '@/shared/meta/meta';
import { TypographyH1 } from '@/shared/ui/typography';
import { AuthLayout } from '@/widgets/layout/auth-layout';

const Policy = (): JSX.Element => {
	return (
		<Meta title='Политика конфиденциальности'>
			<AuthLayout>
				<TypographyH1>Политика конфиденциальности</TypographyH1>
			</AuthLayout>
		</Meta>
	);
};

export default Policy;
