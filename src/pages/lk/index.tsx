import { ChangePasswordDialog } from '@/features/lk/change-password/ui/change-password-dialog';
import { EditProfileForm } from '@/features/lk/edit-profile/ui/edit-profile-form';
import {
	ModelActionGender,
	getApiBrandByGenderCategorySlug,
	getApiCategoryRelationSlug,
	getApiCategoryTop,
} from '@/shared/api/generated';
import { useGetProfileApi } from '@/shared/api/queries/get-profile-api';
import { Meta } from '@/shared/meta/meta';
import { HomePageProps } from '@/shared/types/home-page';
import { TypographyH1 } from '@/shared/ui/typography';
import { LKLayout } from '@/widgets/layout/lk-layout';
import { GetServerSideProps } from 'next';

const LkPage = ({
	genderMenu,
	menu,
	topLevels,
	brands,
}: HomePageProps): JSX.Element => {
	const { data: profile } = useGetProfileApi();

	return (
		<Meta title='Личный кабинет | Мои данные'>
			<LKLayout
				genderMenu={genderMenu}
				menu={menu}
				topLevels={topLevels}
				brands={brands}
			>
				{profile && (
					<div>
						<TypographyH1 className='text-2xl font-normal mb-5'>
							Мои данные
						</TypographyH1>
						<EditProfileForm profile={profile} />
						<TypographyH1 className='text-2xl font-normal mb-5'>
							Способы входа
						</TypographyH1>
						<ChangePasswordDialog />
					</div>
				)}
			</LKLayout>
		</Meta>
	);
};

export default LkPage;

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
