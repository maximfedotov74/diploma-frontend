import { PopularSlider } from '@/features/popular-models/ui/popular-slider';
import {
	ModelAction,
	ModelActionGender,
	ModelBrand,
	ModelCategoryModel,
	getApiActionGender,
	getApiBrandByGenderCategorySlug,
	getApiCategoryLastLevelsSlug,
	getApiCategoryRelationSlug,
	getApiCategoryTop,
} from '@/shared/api/generated';
import { Meta } from '@/shared/meta/meta';
import { HomePageProps } from '@/shared/types/home-page';
import { ActionSlider } from '@/shared/ui/action-slider';
import { CategorySlider } from '@/shared/ui/category-slider';
import { Link } from '@/shared/ui/link';
import { TypographyH1 } from '@/shared/ui/typography';
import { Layout } from '@/widgets/layout/layout';
import { GetServerSideProps } from 'next';
import Image from 'next/image';

type WomenHomeProps = HomePageProps & {
	actions: ModelAction[];
	lastLevelCategories: ModelCategoryModel[];
};

const WomenHome = ({
	menu,
	topLevels,
	genderMenu,
	actions,
	lastLevelCategories,
	brands,
}: WomenHomeProps): JSX.Element => {
	const lastTwo = actions ? actions.slice(-2) : [];

	const rest = actions ? actions.slice(0, actions.length - 2) : [];

	return (
		<Meta title={menu.title}>
			<Layout
				menu={menu}
				topLevels={topLevels}
				genderMenu={genderMenu}
				brands={brands}
			>
				<div className='md:grid md:grid-cols-[2.2fr_0.8fr] gap-6 lg:gap-10 mb-10'>
					{rest.length > 0 ? (
						<ActionSlider actions={rest} />
					) : (
						<TypographyH1>Акций сейчас нет!</TypographyH1>
					)}
					{lastTwo.length > 0 ? (
						<div className='hidden md:flex flex-col'>
							{lastTwo.map(a => (
								<div key={a.id} className='mb-3 last:mb-0'>
									<Link variant='menu' href='/' className='mb-1 block'>
										<Image
											className='w-full h-[210px] lg:h-[260px]  rounded-md'
											alt={a.title}
											src={a.img_path ?? '/img/action-default.png'}
											width={300}
											height={300}
										/>
									</Link>
									<div className='text-base lg:text-xl'>{a.title}</div>
								</div>
							))}
						</div>
					) : (
						<div>Ждите новый специальных предложений!</div>
					)}
				</div>
				<div className='mb-10'>
					<CategorySlider lastLevelCategories={lastLevelCategories} />
				</div>
				<PopularSlider genderSlug={genderMenu} />
			</Layout>
		</Meta>
	);
};

export default WomenHome;

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
	res.setHeader('Set-Cookie', `page-gender=${ModelActionGender.women};path=/`);

	const topLevels = await getApiCategoryTop();
	const menu = await getApiCategoryRelationSlug(ModelActionGender.women);
	const actions = await getApiActionGender(ModelActionGender.women);
	const lastLevelCategories = await getApiCategoryLastLevelsSlug(
		ModelActionGender.women
	);
	const brands = await getApiBrandByGenderCategorySlug(ModelActionGender.women);

	try {
		return {
			props: {
				topLevels,
				menu,
				genderMenu: ModelActionGender.women,
				actions,
				lastLevelCategories,
				brands,
			},
		};
	} catch (e) {
		return {
			notFound: true,
		};
	}
};
