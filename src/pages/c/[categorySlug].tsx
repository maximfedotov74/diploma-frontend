import { CatalogCategoriesMenu } from '@/features/catalog/ui/catalog-categories-menu';
import { CatalogFilters } from '@/features/catalog/ui/catalog-filters';
import {
	ModelCatalogCategoryRelationResponse,
	ModelCatalogFilters,
	ModelCatalogResponse,
	getApiCategoryCatalogSlug,
	getApiCategoryRelationSlug,
	getApiCategoryTop,
	getApiCharacteristicsCatalogCategorySlug,
	getApiProductCatalogCategorySlug,
} from '@/shared/api/generated';
import { MEN } from '@/shared/constants/genders';
import { Meta } from '@/shared/meta/meta';
import { HomePageProps } from '@/shared/types/home-page';
import { ProductCard } from '@/features/product-card/product-card';
import { TypographyH1 } from '@/shared/ui/typography';
import { Layout } from '@/widgets/layout/layout';
import { GetServerSideProps } from 'next';

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
						<CatalogFilters catalogFilters={catalogFilters} className='mb-5' />
						<div className='grid grid-cols-3 gap-y-3 gap-x-3'>
							{modelResponse.models?.map(m => (
								<ProductCard key={m.model_id} card={m} />
							))}
						</div>
					</div>
				</div>
			</Layout>
		</Meta>
	);
};

export default CatalogPage;

export const getServerSideProps: GetServerSideProps = async ({
	req,
	res,
	params,
}) => {
	let gender = req.cookies['page-gender'];

	if (!gender) {
		gender = MEN;
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
		const modelResponse = await getApiProductCatalogCategorySlug(categorySlug);

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
