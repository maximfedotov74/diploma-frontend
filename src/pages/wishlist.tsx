import {
	ModelActionGender,
	getApiCategoryRelationSlug,
	getApiCategoryTop,
} from '@/shared/api/generated';
import { Meta } from '@/shared/meta/meta';
import { HomePageProps } from '@/shared/types/home-page';

import { Layout } from '@/widgets/layout/layout';
import { GetServerSideProps } from 'next';
import { WishlistView } from '@/features/wishlist-items/wishlist-view';

const WishList = ({ genderMenu, menu, topLevels }: HomePageProps) => {
	return (
		<Meta title='Избранное'>
			<Layout genderMenu={genderMenu} menu={menu} topLevels={topLevels}>
				<WishlistView />
			</Layout>
		</Meta>
	);
};

export default WishList;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	let gender = req.cookies['page-gender'];

	if (!gender) {
		gender = ModelActionGender.men;
	}

	try {
		const topLevels = await getApiCategoryTop();
		const menu = await getApiCategoryRelationSlug(gender);
		return {
			props: {
				topLevels,
				menu,
				genderMenu: gender,
			},
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};
