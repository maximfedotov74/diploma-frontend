import { CatalogCategoriesMenu } from '@/features/catalog/ui/catalog-categories-menu';
import { CatalogFilters } from '@/features/catalog/ui/catalog-filters';
import {
	ModelActionGender,
	ModelCatalogCategoryRelationResponse,
	ModelCatalogFilters,
	ModelCatalogResponse,
	getApiCategoryCatalogSlug,
	getApiCategoryRelationSlug,
	getApiCategoryTop,
	getApiCharacteristicsCatalogCategorySlug,
	getApiProductCatalogCategorySlug,
} from '@/shared/api/generated';
import { Meta } from '@/shared/meta/meta';
import { HomePageProps } from '@/shared/types/home-page';
import { ProductCard } from '@/features/product-card/product-card';
import { TypographyH1 } from '@/shared/ui/typography';
import { Layout } from '@/widgets/layout/layout';
import { GetServerSideProps } from 'next';
import { Link } from '@/shared/ui/link';
import { CATALOG_ROUTE } from '@/shared/constants/routes/public';
import { CatalogModels } from '@/features/catalog/ui/catalog-models';

type CatalogPageProps = HomePageProps & {
	catalogCategoriesResponse: ModelCatalogCategoryRelationResponse;
	catalogFilters: ModelCatalogFilters;
	modelResponse: ModelCatalogResponse;
};

const CatalogPage = ({
	menu,
	topLevels,
	catalogCategoriesResponse,
	catalogFilters,
	genderMenu,
	modelResponse,
}: CatalogPageProps): JSX.Element => {
	return (
		<Meta title='Каталог'>
			<Layout menu={menu} topLevels={topLevels} genderMenu={genderMenu}>
				<TypographyH1 className='mb-5 text-2xl font-normal'>
					{catalogCategoriesResponse.current.title}
				</TypographyH1>
				{modelResponse.models && modelResponse.models.length > 0 ? (
					<div className='grid grid-cols-[1fr_3.5fr] gap-5'>
						<div>
							<CatalogCategoriesMenu
								categories={
									catalogCategoriesResponse.catalog_categories.subcategories
								}
								currentSlug={catalogCategoriesResponse.current.slug}
							/>
						</div>
						<div>
							<CatalogFilters
								catalogFilters={catalogFilters}
								className='mb-5'
							/>
							<CatalogModels models={modelResponse.models || []} />
						</div>
					</div>
				) : (
					<div>
						<div className='text-2xl font-bold'>
							По вашему запросу ничего не найдено!
						</div>
						<Link
							className='text-lg'
							href={`${CATALOG_ROUTE}/${catalogCategoriesResponse.current.slug}`}
						>
							Очистить фильтры
						</Link>
					</div>
				)}
			</Layout>
		</Meta>
	);
};

export default CatalogPage;

export const getServerSideProps: GetServerSideProps = async ({
	req,
	res,
	params,
	query,
}) => {
	let gender = req.cookies['page-gender'];

	if (!gender) {
		gender = ModelActionGender.men;
	}

	const categorySlug = params?.categorySlug as string;

	if (!categorySlug) {
		return {
			notFound: true,
		};
	}

	try {
		const topLevels = await getApiCategoryTop();
		const menu = await getApiCategoryRelationSlug(gender);
		const catalogCategoriesResponse = await getApiCategoryCatalogSlug(
			categorySlug
		);
		const catalogFilters = await getApiCharacteristicsCatalogCategorySlug(
			categorySlug
		);

		const modelResponse = await getApiProductCatalogCategorySlug(
			categorySlug,
			query
		);

		return {
			props: {
				topLevels,
				menu: menu,
				catalogCategoriesResponse,
				catalogFilters,
				genderMenu: gender,
				modelResponse,
			},
		};
	} catch (e) {
		return {
			notFound: true,
		};
	}
};
