import { Sessions } from '@/features/lk/sessions/ui/sessions';
import {
	ModelActionGender,
	getApiBrandByGenderCategorySlug,
	getApiCategoryRelationSlug,
	getApiCategoryTop,
} from '@/shared/api/generated';
import { Meta } from '@/shared/meta/meta';
import { HomePageProps } from '@/shared/types/home-page';
import { LKLayout } from '@/widgets/layout/lk-layout';
import { GetServerSideProps } from 'next';

const LkSessions = ({
	genderMenu,
	menu,
	topLevels,
	brands,
}: HomePageProps): JSX.Element => {
	return (
		<Meta title='Личный кабинет | Мои данные'>
			<LKLayout
				genderMenu={genderMenu}
				menu={menu}
				topLevels={topLevels}
				brands={brands}
			>
				<Sessions />
			</LKLayout>
		</Meta>
	);
};

export default LkSessions;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
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
				menu: menu,
				genderMenu: gender,
				brands,
			},
		};
	} catch (e) {
		return {
			notFound: true,
		};
	}
};
