import { CatalogCategoriesMenu } from '@/features/catalog/ui/catalog-categories-menu';
import { CatalogFilters } from '@/features/catalog/ui/catalog-filters';
import {
	ModelActionGender,
	ModelBrand,
	ModelCatalogCategoryRelationResponse,
	ModelCatalogFilters,
	ModelCatalogResponse,
	getApiBrandByGenderCategorySlug,
	getApiCategoryCatalogSlug,
	getApiCategoryRelationSlug,
	getApiCategoryTop,
	getApiCharacteristicsCatalogCategorySlug,
	getApiProductCatalogCategorySlug,
} from '@/shared/api/generated';
import { Meta } from '@/shared/meta/meta';
import { HomePageProps } from '@/shared/types/home-page';
import { TypographyH1 } from '@/shared/ui/typography';
import { Layout } from '@/widgets/layout/layout';
import { GetServerSideProps } from 'next';
import { Link } from '@/shared/ui/link';
import { CATALOG_ROUTE } from '@/shared/constants/routes/public';
import { CatalogModels } from '@/features/catalog/ui/catalog-models';
import { CatalogPagination } from '@/features/catalog/ui/catalog-pagination';

type CatalogPageProps = HomePageProps & {
	catalogCategoriesResponse: ModelCatalogCategoryRelationResponse;
	catalogFilters: ModelCatalogFilters;
	modelResponse: ModelCatalogResponse;
	brands: ModelBrand[];
};

const CatalogPage = ({
	menu,
	topLevels,
	catalogCategoriesResponse,
	catalogFilters,
	genderMenu,
	modelResponse,
	brands,
}: CatalogPageProps): JSX.Element => {
	return (
		<Meta title='Каталог'>
			<Layout
				menu={menu}
				topLevels={topLevels}
				genderMenu={genderMenu}
				brands={brands}
			>
				<TypographyH1 className='mb-5 text-2xl font-normal'>
					{catalogCategoriesResponse.current.title}
				</TypographyH1>
				{modelResponse.models && modelResponse.models.length > 0 ? (
					<div className='lg:grid grid-cols-[1fr_3.5fr] gap-5'>
						<div className='lg:mb-0 mb-5'>
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
							<CatalogModels
								models={modelResponse.models || []}
								className='mb-5'
							/>
							<CatalogPagination total={modelResponse.total_count} />
						</div>
					</div>
				) : (
					<div>
						<div className='text-2xl font-bold mb-6'>
							По вашему запросу ничего не найдено!
						</div>
						<div className='flex flex-col items-start'>
							<Link
								className='mb-4 text-lg'
								href={`${CATALOG_ROUTE}/${catalogCategoriesResponse.catalog_categories.slug}`}
							>
								Перейти к: {catalogCategoriesResponse.catalog_categories.title}
							</Link>
							<Link
								className='text-lg'
								href={`${CATALOG_ROUTE}/${catalogCategoriesResponse.current.slug}`}
							>
								Очистить фильтры
							</Link>
						</div>
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
		const brands = await getApiBrandByGenderCategorySlug(gender);

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
				brands,
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
