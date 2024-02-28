import {
	getApiCategoryRelationSlug,
	getApiCategoryTop,
} from '@/shared/api/generated';
import { WOMEN } from '@/shared/constants/genders';
import { HomePageProps } from '@/shared/types/home-page';
import { Layout } from '@/widgets/layout/layout';
import { GetServerSideProps } from 'next';

const WomenHome = ({
	menu,
	topLevels,
	genderMenu,
}: HomePageProps): JSX.Element => {
	return (
		<Layout menu={menu} topLevels={topLevels} genderMenu={genderMenu}>
			<div>women home</div>
		</Layout>
	);
};

export default WomenHome;

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
	res.setHeader('Set-Cookie', `page-gender=${WOMEN};path=/`);

	const topLevels = await getApiCategoryTop();
	const menu = await getApiCategoryRelationSlug(WOMEN);

	try {
		return {
			props: { topLevels, menu, genderMenu: WOMEN },
		};
	} catch (e) {
		return {
			notFound: true,
		};
	}
};
