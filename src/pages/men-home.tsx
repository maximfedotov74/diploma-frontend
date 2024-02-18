import {
	getApiCategoryRelationSlug,
	getApiCategoryTop,
} from '@/shared/api/generated';
import { MEN } from '@/shared/constants/genders';
import { HomePageProps } from '@/shared/types/home-page';
import { Layout } from '@/widgets/layout/layout';
import { GetServerSideProps } from 'next';

const MenHome = ({ menu, topLevels }: HomePageProps): JSX.Element => {
	return (
		<Layout menu={menu} topLevels={topLevels}>
			<div>men home</div>
		</Layout>
	);
};

export default MenHome;

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
	res.setHeader('Set-Cookie', `page-gender=${MEN};path=/`);

	const topLevels = await getApiCategoryTop();
	const menu = await getApiCategoryRelationSlug(MEN);

	try {
		return {
			props: { topLevels, menu },
		};
	} catch (e) {
		return {
			notFound: true,
		};
	}
};
