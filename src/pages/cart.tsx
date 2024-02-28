import { CartView } from '@/features/cart-items/ui/cart-view';
import {
	getApiCategoryRelationSlug,
	getApiCategoryTop,
} from '@/shared/api/generated';
import { MEN } from '@/shared/constants/genders';
import { Meta } from '@/shared/meta/meta';
import { HomePageProps } from '@/shared/types/home-page';
import { Layout } from '@/widgets/layout/layout';
import { GetServerSideProps } from 'next';

const Cart = ({ genderMenu, menu, topLevels }: HomePageProps) => {
	return (
		<Meta title='Корзина'>
			<Layout genderMenu={genderMenu} menu={menu} topLevels={topLevels}>
				<CartView />
			</Layout>
		</Meta>
	);
};

export default Cart;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	let gender = req.cookies['page-gender'];

	if (!gender) {
		gender = MEN;
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
