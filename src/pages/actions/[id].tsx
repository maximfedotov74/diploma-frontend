import {
	ModelAction,
	ModelActionGender,
	ModelActionModel,
	getApiActionByIdId,
	getApiActionModelId,
	getApiBrandByGenderCategorySlug,
	getApiCategoryRelationSlug,
	getApiCategoryTop,
} from '@/shared/api/generated';
import { Meta } from '@/shared/meta/meta';
import { HomePageProps } from '@/shared/types/home-page';
import {
	TypographyH1,
	TypographyH3,
	TypographyP,
} from '@/shared/ui/typography';
import { Layout } from '@/widgets/layout/layout';
import { GetServerSideProps } from 'next';

import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Card, CardHeader, CardTitle } from '@/shared/ui/card';
import { ProductCard } from '@/features/product-card/product-card';

const ActionPage = ({
	brands,
	genderMenu,
	menu,
	topLevels,
	action,
	models,
}: HomePageProps & { action: ModelAction; models: ModelActionModel[] }) => {
	return (
		<Meta title={`Акция | ${action.title}`} description={action.description}>
			<Layout
				brands={brands}
				genderMenu={genderMenu}
				menu={menu}
				topLevels={topLevels}
			>
				<TypographyH1 className='text-3xl mb-5'>{action.title}</TypographyH1>
				{action.description && (
					<TypographyP className='mb-5'>{action.description}</TypographyP>
				)}
				<div className='text-foreground/60 mb-5'>
					c{' '}
					{format(parseISO(action.created_at), 'dd MMMM yyyy', {
						locale: ru,
					})}{' '}
					по{' '}
					{format(parseISO(action.end_date), 'dd MMMM yyyy', {
						locale: ru,
					})}
				</div>
				<TypographyH3 className='mb-3 text-xl'>Список моделей</TypographyH3>
				<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-3 gap-x-3'>
					{models?.map(m => (
						<ProductCard
							withHover={false}
							withSelectSize={false}
							withWish={false}
							key={m.action_model_id}
							card={{
								article: m.article,
								brand: m.brand,
								category: m.category,
								images: [],
								model_main_image_path: m.model_main_image_path,
								model_id: m.model_id,
								model_price: m.model_price,
								product_id: m.product_id,
								product_slug: m.product_slug,
								product_title: m.product_title,
								sizes: [],
								model_discount: m.model_discount,
							}}
						/>
					))}
				</div>
			</Layout>
		</Meta>
	);
};

export default ActionPage;

export const getServerSideProps: GetServerSideProps = async ({
	req,
	res,
	params,
}) => {
	let gender = req.cookies['page-gender'];

	if (!gender) {
		gender = ModelActionGender.men;
	}

	const id = params?.id as string;

	if (!id) {
		return {
			notFound: true,
		};
	}

	try {
		const topLevels = await getApiCategoryTop();
		const menu = await getApiCategoryRelationSlug(gender);
		const brands = await getApiBrandByGenderCategorySlug(gender);
		const action = await getApiActionByIdId(id);
		const models = await getApiActionModelId(action.id);
		return {
			props: {
				topLevels,
				menu: menu,
				genderMenu: gender,
				brands,
				action,
				models,
			},
		};
	} catch (e) {
		return {
			notFound: true,
		};
	}
};
