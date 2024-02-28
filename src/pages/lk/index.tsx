import { EditProfileForm } from '@/features/lk/edit-profile/ui/edit-profile-form';
import {
	getApiCategoryRelationSlug,
	getApiCategoryTop,
} from '@/shared/api/generated';
import { useGetProfileApi } from '@/shared/api/queries/get-profile-api';
import { GENDERS, MEN } from '@/shared/constants/genders';
import { Meta } from '@/shared/meta/meta';
import { HomePageProps } from '@/shared/types/home-page';
import { TypographyH1 } from '@/shared/ui/typography';
import { LKLayout } from '@/widgets/layout/lk-layout';
import { GetServerSideProps } from 'next';

const LkPage = ({
	genderMenu,
	menu,
	topLevels,
}: HomePageProps): JSX.Element => {
	const { data: profile } = useGetProfileApi();

	return (
		<Meta title='Личный кабинет | Мои данные'>
			<LKLayout genderMenu={genderMenu} menu={menu} topLevels={topLevels}>
				<TypographyH1 className='text-2xl font-normal mb-5'>
					Мои данные
				</TypographyH1>
				{profile && <EditProfileForm profile={profile} />}
			</LKLayout>
		</Meta>
	);
};

export default LkPage;

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
				genderMenu: MEN,
			},
		};
	} catch (e) {
		return {
			notFound: true,
		};
	}
};
