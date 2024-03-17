import {
	ModelActionGender,
	ModelProduct,
	ModelProductModel,
	ModelProductModelColors,
	ModelProductModelImg,
	ModelProductModelOption,
	ModelProductModelSize,
	getApiBrandByGenderCategorySlug,
	getApiCategoryRelationSlug,
	getApiCategoryTop,
	getApiProductId,
	getApiProductModelColorsId,
	getApiProductModelImgId,
	getApiProductModelOptionsId,
	getApiProductModelSizesId,
	getApiProductModelBySlugSlug,
} from '@/shared/api/generated';
import { Meta } from '@/shared/meta/meta';
import { HomePageProps } from '@/shared/types/home-page';

import { Price } from '@/shared/ui/price';
import { ColoredModelsDropdown } from '@/features/product-page/ui/colored-models-dropdown';
import { Layout } from '@/widgets/layout/layout';
import { GetServerSideProps } from 'next';
import { ImagesCarousel } from '@/features/product-page/ui/images-carousel';
import { SizeSelectToCart } from '@/features/size-select-to-basket/ui/size-select-to-cart';
import { ProductInfoTabs } from '@/features/product-page/ui/product-info-tabs';
import { ImagesCarouselMobile } from '@/features/product-page/ui/images-carousel-mobile';
import { SimilarProducts } from '@/features/product-page/ui/similar-products';
import { ModelViews } from '@/features/product-page/ui/model-views';
import { ViewHistory } from '@/features/product-page/ui/view-history';

type ModelPage = {
	model: ModelProductModel;
	product: ModelProduct;
	images: ModelProductModelImg[];
	sizes: ModelProductModelSize[];
	options: ModelProductModelOption[];
	productModels: ModelProductModelColors[];
};

type ModelPageProps = HomePageProps & {
	page: ModelPage;
};

const ModelPage = ({
	genderMenu,
	menu,
	topLevels,
	page,
	brands,
}: ModelPageProps) => {
	const images = [
		page.model.image_path,
		...page.images.map(img => img.img_path),
	];

	let options = page.options.map(item => ({
		title: item.title,
		values: item.values,
	}));

	options = [
		...options,
		{ title: 'Артикул', values: [{ id: 999922, value: page.model.article }] },
		{
			title: 'Товар',
			values: [{ id: 999923, value: page.product.id.toString() }],
		},
	];

	return (
		<Meta
			title={`${page.product.title} ${page.product.brand.title} aртикул: ${page.model.article} - купить в магазине`}
		>
			<Layout
				genderMenu={genderMenu}
				menu={menu}
				topLevels={topLevels}
				brands={brands}
			>
				<div className='flex flex-col md:grid grid-cols-[2fr_1fr] gap-6 mb-10'>
					<div className='self-center'>
						<div>
							<div className='hidden lg:block'>
								<ImagesCarousel images={images} />
							</div>
							<div className='lg:hidden block'>
								<ImagesCarouselMobile images={images} />
							</div>
						</div>
					</div>
					<div>
						<div className='text-2xl'>{page.product.brand.title}</div>
						<div className='text-foreground/60'>
							{page.product.category.title}
						</div>
						<div className='text-foreground/60 mb-5'>{page.product.title}</div>
						<Price
							price={page.model.price}
							discount={page.model.discount}
							large
							className='mb-4'
						/>
						<ColoredModelsDropdown
							models={page.productModels}
							currentModelId={page.model.id}
							className='mb-4'
						/>
						<div className='w-[200px] mb-5'>
							<SizeSelectToCart sizes={page.sizes} />
						</div>
						<ModelViews modelId={page.model.id} />
					</div>
				</div>
				<ProductInfoTabs
					options={options}
					brand={page.product.brand}
					modelId={page.model.id}
					className='mb-8'
				/>
				<SimilarProducts
					brandId={page.product.brand.id}
					categoryId={page.product.category.category_id}
					modelId={page.model.id}
				/>
				<ViewHistory modelId={page.model.id} />
			</Layout>
		</Meta>
	);
};

export default ModelPage;

export const getServerSideProps: GetServerSideProps = async ({
	req,
	params,
}) => {
	let gender = req.cookies['page-gender'];

	if (!gender) {
		gender = ModelActionGender.men;
	}

	const slug = params?.slug as string;

	if (!slug) {
		return {
			notFound: true,
		};
	}

	try {
		const topLevels = await getApiCategoryTop();
		const menu = await getApiCategoryRelationSlug(gender);
		const brands = await getApiBrandByGenderCategorySlug(gender);

		const model = await getApiProductModelBySlugSlug(slug);
		const product = await getApiProductId(model.product_id);
		const sizes = await getApiProductModelSizesId(model.id);
		const images = await getApiProductModelImgId(model.id);
		const options = await getApiProductModelOptionsId(model.id);
		const productModels = await getApiProductModelColorsId(product.id);

		const page = {
			model,
			product,
			sizes,
			images,
			options,
			productModels,
		};

		return {
			props: {
				topLevels,
				menu,
				genderMenu: gender,
				page: page,
				brands,
			},
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};
