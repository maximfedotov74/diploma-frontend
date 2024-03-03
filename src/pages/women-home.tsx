import {
	ModelActionGender,
	getApiCategoryRelationSlug,
	getApiCategoryTop,
} from '@/shared/api/generated';
import { Meta } from '@/shared/meta/meta';
import { HomePageProps } from '@/shared/types/home-page';
import { Layout } from '@/widgets/layout/layout';
import { GetServerSideProps } from 'next';

const WomenHome = ({
	menu,
	topLevels,
	genderMenu,
}: HomePageProps): JSX.Element => {
	return (
		<Meta title={menu.title}>
			<Layout menu={menu} topLevels={topLevels} genderMenu={genderMenu}>
				<div>women home</div>
			</Layout>
		</Meta>
	);
};

export default WomenHome;

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
	res.setHeader('Set-Cookie', `page-gender=${ModelActionGender.women};path=/`);

	const topLevels = await getApiCategoryTop();
	const menu = await getApiCategoryRelationSlug(ModelActionGender.women);

	try {
		return {
			props: { topLevels, menu, genderMenu: ModelActionGender.women },
		};
	} catch (e) {
		return {
			notFound: true,
		};
	}
};
