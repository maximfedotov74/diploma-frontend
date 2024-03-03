import {
	ModelAction,
	ModelActionGender,
	getApiActionGender,
	getApiCategoryRelationSlug,
	getApiCategoryTop,
} from '@/shared/api/generated';
import { Meta } from '@/shared/meta/meta';
import { HomePageProps } from '@/shared/types/home-page';
import { Layout } from '@/widgets/layout/layout';
import { GetServerSideProps } from 'next';

type MenHomeProps = HomePageProps & {
	actions: ModelAction[];
};

const MenHome = ({
	menu,
	topLevels,
	genderMenu,
	actions,
}: MenHomeProps): JSX.Element => {
	return (
		<Meta title={menu.title}>
			<Layout menu={menu} topLevels={topLevels} genderMenu={genderMenu}>
				<div>men home</div>
				<div>{JSON.stringify(actions)}</div>
			</Layout>
		</Meta>
	);
};

export default MenHome;

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
	res.setHeader('Set-Cookie', `page-gender=${ModelActionGender.men};path=/`);

	const topLevels = await getApiCategoryTop();
	const menu = await getApiCategoryRelationSlug(ModelActionGender.men);
	const actions = await getApiActionGender(ModelActionGender.men);

	try {
		return {
			props: { topLevels, menu, genderMenu: ModelActionGender.men, actions },
		};
	} catch (e) {
		return {
			notFound: true,
		};
	}
};
