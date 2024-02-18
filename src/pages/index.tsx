import {
	getApiCategoryRelationSlug,
	getApiCategoryTop,
} from '@/shared/api/generated';
import { TypographyH1 } from '@/shared/ui/typography';
import { Layout } from '@/widgets/layout/layout';
import { GetServerSideProps } from 'next';
import { Meta } from '@/shared/meta/meta';
import { HomePageProps } from '@/shared/types/home-page';
import { GENDERS, MEN } from '@/shared/constants/genders';

//https://github.com/shadcn-ui/ui/tree/main/apps/www/app/examples

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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const gender = req.cookies['page-gender'];

	if (gender && GENDERS.includes(gender)) {
		return {
			redirect: {
				destination: `/${gender}-home`,
				permanent: true,
			},
		};
	}

	try {
		const topLevels = await getApiCategoryTop();
		const menu = await getApiCategoryRelationSlug(MEN);
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
