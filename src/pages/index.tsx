import {
	ModelActionGender,
	getApiCategoryRelationSlug,
	getApiCategoryTop,
} from '@/shared/api/generated';
import { TypographyH2, TypographySmall } from '@/shared/ui/typography';
import { Layout } from '@/widgets/layout/layout';
import { GetServerSideProps } from 'next';
import { Meta } from '@/shared/meta/meta';
import { HomePageProps } from '@/shared/types/home-page';
import Image from 'next/image';
import { Link } from '@/shared/ui/link';
import { Icon } from '@/shared/ui/icon';

function Home({ topLevels, menu, genderMenu }: HomePageProps) {
	return (
		<Meta title='Главная'>
			<Layout topLevels={topLevels} menu={menu} genderMenu={genderMenu}>
				<TypographyH2 className='text-center mb-4 xs:'>
					Выберите интересующий вас раздел
				</TypographyH2>
				<div className='sm:grid grid-cols-3 gap-2 mb-10'>
					<Link
						href={`/${ModelActionGender.women}-home`}
						className='relative group transition-colors'
					>
						<Image
							className='h-[300px]  md:h-[400px] lg:h-[500px] opacity-90 mb-2 sm:mb-0'
							alt='Женская одежда'
							src='/img/women-clothes.avif'
							width={600}
							height={600}
						/>
						<div className='absolute bottom-0 left-0 transition-colors group-hover:bg-black bg-black/70 text-white text-lg text-center w-full py-2'>
							Женщинам
						</div>
					</Link>
					<Link
						href={`/${ModelActionGender.men}-home`}
						className='relative group transition-colors'
					>
						<Image
							className='h-[300px]  md:h-[400px] lg:h-[500px] opacity-90 mb-2 sm:mb-0'
							alt='Мужская одежда'
							src='/img/clothes-men.avif'
							width={600}
							height={600}
						/>
						<div className='absolute bottom-0 left-0 transition-colors group-hover:bg-black bg-black/70 text-white text-lg text-center w-full py-2'>
							Мужчинам
						</div>
					</Link>
					<Link
						href={`/${ModelActionGender.children}-home`}
						className='relative group transition-colors'
					>
						<Image
							className='h-[300px]  md:h-[400px] lg:h-[500px] opacity-90'
							alt='Детская одежда'
							src='/img/clothes-children.avif'
							width={600}
							height={600}
						/>
						<div className='absolute bottom-0 left-0 transition-colors group-hover:bg-black bg-black/70 text-white text-lg text-center w-full py-2'>
							Детям
						</div>
					</Link>
				</div>
				<div className='sm:grid grid-cols-3 gap-2'>
					<div className='flex flex-col items-center justify-center'>
						<div>
							<Icon icon='car_outline_24' className='h-16 w-16' />
						</div>
						<TypographySmall className='mt-2'>
							Быстрая доставка товаров
						</TypographySmall>
					</div>
					<div className='flex flex-col items-center justify-center'>
						<div>
							<Icon icon='hanger_outline_24' className='h-16 w-16' />
						</div>
						<TypographySmall className='mt-2'>
							Примерка перед покупкой
						</TypographySmall>
					</div>
					<div className='flex flex-col items-center justify-center'>
						<div>
							<Icon icon='payment_card_outline_24' className='h-16 w-16' />
						</div>
						<TypographySmall className='mt-2'>
							Удобные способы оплаты
						</TypographySmall>
					</div>
				</div>
			</Layout>
		</Meta>
	);
}

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const gender = req.cookies['page-gender'];

	if (gender && Object.keys(ModelActionGender).includes(gender)) {
		return {
			redirect: {
				destination: `/${gender}-home`,
				permanent: true,
			},
		};
	}

	try {
		const topLevels = await getApiCategoryTop();
		const menu = await getApiCategoryRelationSlug(ModelActionGender.men);
		return {
			props: {
				topLevels,
				menu: menu,
				genderMenu: ModelActionGender.men,
			},
		};
	} catch (e) {
		return {
			notFound: true,
		};
	}
};
