import {
	ModelActionGender,
	getApiBrandByGenderCategorySlug,
	getApiCategoryRelationSlug,
	getApiCategoryTop,
} from '@/shared/api/generated';
import { Meta } from '@/shared/meta/meta';
import { HomePageProps } from '@/shared/types/home-page';

import { Layout } from '@/widgets/layout/layout';
import { GetServerSideProps } from 'next';
import { WishlistView } from '@/features/wishlist-items/wishlist-view';

const WishList = ({ genderMenu, menu, topLevels, brands }: HomePageProps) => {
	return (
		<Meta title='Избранное'>
			<Layout
				genderMenu={genderMenu}
				menu={menu}
				topLevels={topLevels}
				brands={brands}
			>
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
		const brands = await getApiBrandByGenderCategorySlug(gender);

		return {
			props: {
				topLevels,
				menu,
				genderMenu: gender,
				brands,
			},
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};
