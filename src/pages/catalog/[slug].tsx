import { withLayout } from '@/layout/with-layout';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { AppLink } from '@/shared/ui/link';
import { Typography } from '@/shared/ui/typography';
import clsx from 'clsx';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

interface СatalogCategory {
	category_id: number;
	title: string;
	slug: string;
	short_title: string;
	img_path?: string;
	parent_category_id: number;
	level: number;
	active: boolean;
	subcategories: СatalogCategory[];
}

const CategoryItem = ({ item }: { item: СatalogCategory }) => {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (item.active) {
			setOpen(true);
		} else {
			setOpen(false);
		}
	}, [item.active]);

	return (
		<ul style={{ paddingLeft: item.level * 1.5 }}>
			<li>
				<div className='flex items-center mb-2'>
					<AppLink href={`/catalog/${item.slug}`}>{item.short_title}</AppLink>
					{item.subcategories.length > 0 && (
						<Button variant='simple' onClick={() => setOpen(p => !p)}>
							<Icon
								icon='chevron_down_small_24'
								className={clsx('h-6 w-6 transition-transform', {
									'rotate-180': open,
								})}
							/>
						</Button>
					)}
				</div>
				{open &&
					item.subcategories.map(sub => (
						<CategoryItem key={sub.category_id} item={sub} />
					))}
			</li>
		</ul>
	);
};

const Catalog = ({
	data,
	slug,
}: {
	data: СatalogCategory;
	slug: string;
}): JSX.Element => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const srartReload = () => {
			setLoading(true);
		};
		const endReload = () => {
			setLoading(false);
		};

		router.events.on('routeChangeStart', srartReload);
		router.events.on('routeChangeComplete', endReload);
		return () => {
			router.events.off('routeChangeStart', srartReload);
			router.events.off('routeChangeComplete', endReload);
		};
	}, [router, data]);
	return (
		<div className='py-10'>
			<div>{slug}</div>
			<Typography variant='h3' className='mb-5'>
				{data.title}
			</Typography>

			<div className='flex'>
				<div className='w-56 self-start border border-black p-2'>
					{data.subcategories.map(item => (
						<CategoryItem key={item.category_id} item={item} />
					))}
				</div>

				<div className='catalog-grid ml-5 w-full'>
					{loading ? (
						Array.from({ length: 16 }).map((_, i) => (
							<div
								key={i}
								className='w-[230px] rounded-md overflow-hidden shadow-lg'
							>
								<div className='h-[332px] mb-4 skeleton'></div>
								<div className='h-10 mb-2 skeleton'></div>
								<div className='h-10 skeleton'></div>
							</div>
						))
					) : (
						<div>catalog</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default withLayout(Catalog);

export const getServerSideProps: GetServerSideProps = async ctx => {
	const slug = ctx.params?.slug;

	if (slug) {
		const response = await new Promise((resolve, reject) => {
			setTimeout(async () => {
				const r = await fetch(
					'http://localhost:5000/api/category/catalog/' + slug,
					{
						credentials: 'include',
					}
				);
				if (r.ok) {
					const data = (await r.json()) as СatalogCategory;
					resolve(data);
				} else {
					reject();
				}
			}, 3000);
		});
		return {
			props: {
				data: response,
				slug: slug,
			},
		};
	}
	return {
		props: {},
		redirect: '/',
	};
};
