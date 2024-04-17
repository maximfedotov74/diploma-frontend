import {
	ModelAction,
	ModelActionGender,
	getApiAction,
	getApiActionByGenderGender,
	getApiBrandByGenderCategorySlug,
	getApiCategoryRelationSlug,
	getApiCategoryTop,
} from '@/shared/api/generated';
import { ACTIONS_ROUTE } from '@/shared/constants/routes/public';
import { Meta } from '@/shared/meta/meta';
import { HomePageProps } from '@/shared/types/home-page';
import { Link } from '@/shared/ui/link';
import { TypographyH1 } from '@/shared/ui/typography';
import { Layout } from '@/widgets/layout/layout';
import { GetServerSideProps } from 'next';
import Image from 'next/image';

import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

const ActionsPage = ({
	brands,
	genderMenu,
	menu,
	topLevels,
	actions,
}: HomePageProps & { actions: ModelAction[] }) => {
	return (
		<Meta title='Акции'>
			<Layout
				brands={brands}
				genderMenu={genderMenu}
				menu={menu}
				topLevels={topLevels}
			>
				<TypographyH1 className='text-3xl mb-5'>Акции</TypographyH1>
				<div>
					{actions.map(a => (
						<div
							key={a.id}
							className='shadow-md rounded-md flex flex-col items-center md:flex-row md:items-stretch mb-4 last:mb-0 p-4'
						>
							<Link
								className='block mb-5 mr-0 md:mr-5 md:mb-0'
								href={`${ACTIONS_ROUTE}/${a.id}`}
							>
								<Image
									width={260}
									height={180}
									className='w-[260px] h-[180px] rounded-md'
									src={a.img_path ?? '/img/action-default.png'}
									alt='Изображение акции'
								/>
							</Link>
							<div>
								<div className='font-bold mb-5'>{a.title}</div>
								<div className='text-sm md:text-base mb-5'>
									c{' '}
									{format(parseISO(a.created_at), 'dd MMMM yyyy', {
										locale: ru,
									})}{' '}
									по{' '}
									{format(parseISO(a.end_date), 'dd MMMM yyyy', {
										locale: ru,
									})}
								</div>
								<Link
									className='block mb-5 mr-0 md:mr-5 md:mb-0'
									href={`${ACTIONS_ROUTE}/${a.id}`}
									variant='secondary'
								>
									Подробнее
								</Link>
							</div>
						</div>
					))}
				</div>
			</Layout>
		</Meta>
	);
};

export default ActionsPage;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	let gender = req.cookies['page-gender'];

	if (!gender) {
		gender = ModelActionGender.men;
	}

	try {
		const topLevels = await getApiCategoryTop();
		const menu = await getApiCategoryRelationSlug(gender);
		const brands = await getApiBrandByGenderCategorySlug(gender);
		const actions = await getApiActionByGenderGender(gender);

		return {
			props: {
				topLevels,
				menu: menu,
				genderMenu: gender,
				brands,
				actions,
			},
		};
	} catch (e) {
		return {
			notFound: true,
		};
	}
};
