import {
	ModelCategoryModel,
	ModelCategoryRelation,
	getApiCategoryRelationSlug,
	getApiCategoryTop,
} from '@/shared/api/generated';
import { TypographyH1 } from '@/shared/ui/typography';
import { Layout } from '@/widgets/layout/layout';
import { GetServerSideProps } from 'next';
import { Meta } from '@/shared/meta/meta';

//https://github.com/shadcn-ui/ui/tree/main/apps/www/app/examples

type HomePageProps = {
	topLevels: ModelCategoryModel[];
	menu: ModelCategoryRelation;
};

function Home({ topLevels, menu }: HomePageProps) {
	return (
		<Meta title='Главная'>
			<Layout topLevels={topLevels} menu={menu}>
				<TypographyH1>Home page</TypographyH1>
			</Layout>
		</Meta>
	);
}

export default Home;

export const getServerSideProps: GetServerSideProps = async ctx => {
	try {
		const topLevels = await getApiCategoryTop();
		const menu = await getApiCategoryRelationSlug('men');
		return {
			props: {
				topLevels,
				menu: menu,
			},
		};
	} catch (e) {
		return {
			notFound: true,
		};
	}
};
