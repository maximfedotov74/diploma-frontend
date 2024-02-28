import {
	ModelProduct,
	ModelProductModel,
	ModelProductModelColors,
	ModelProductModelImg,
	ModelProductModelOption,
	ModelProductModelSize,
	getApiCategoryRelationSlug,
	getApiCategoryTop,
	getApiProductId,
	getApiProductModelColorsId,
	getApiProductModelImgId,
	getApiProductModelOptionsId,
	getApiProductModelSizesId,
	getApiProductModelSlug,
} from '@/shared/api/generated';
import { MEN } from '@/shared/constants/genders';
import { Meta } from '@/shared/meta/meta';
import { HomePageProps } from '@/shared/types/home-page';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/shared/ui/carousel';

import { Price } from '@/shared/ui/price';
import { ColoredModelsDropdown } from '@/features/product-page/ui/colored-models-dropdown';
import { Layout } from '@/widgets/layout/layout';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { ImagesCarousel } from '@/features/product-page/ui/images-carousel';
import { SizeSelectToCart } from '@/features/size-select-to-basket/ui/size-select-to-cart';
import { ProductInfoTabs } from '@/features/product-page/ui/product-info-tabs';

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

const ModelPage = ({ genderMenu, menu, topLevels, page }: ModelPageProps) => {
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
		{ title: 'Артикул', values: [{ id: 1, value: page.model.article }] },
	];

	return (
		<Meta
			title={`${page.product.title} ${page.product.brand.title} aртикул: ${page.model.article} - купить в магазине`}
		>
			<Layout genderMenu={genderMenu} menu={menu} topLevels={topLevels}>
				<div className='grid grid-cols-[2fr_1fr] gap-6'>
					<div>
						<div className='mb-14'>
							<ImagesCarousel images={images} />
						</div>
						<ProductInfoTabs options={options} brand={page.product.brand} />
					</div>
					<div>
						<div className='text-2xl'>{page.product.brand.title}</div>
						<div className='text-foreground/60 mb-5'>
							{page.product.category.title}
						</div>
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
						<div className='w-[200px]'>
							<SizeSelectToCart sizes={page.sizes} />
						</div>
					</div>
				</div>
			</Layout>
		</Meta>
	);
};

{
	/* <Carousel className='w-full max-w-xs'>
						<CarouselContent>
							{images.map(img => (
								<CarouselItem key={img}>
									<div className='p-1'>
										<Image
											alt='Изображение модели'
											src={img}
											width={700}
											height={700}
										/>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious />
						<CarouselNext />
					</Carousel> */
}

export default ModelPage;

export const getServerSideProps: GetServerSideProps = async ({
	req,
	params,
}) => {
	let gender = req.cookies['page-gender'];

	if (!gender) {
		gender = MEN;
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

		const model = await getApiProductModelSlug(slug);
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
			},
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};
