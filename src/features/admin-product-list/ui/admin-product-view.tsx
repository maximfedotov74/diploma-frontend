import { useGetAdminProductApi } from '@/features/admin-product-list/api/get-admin-product-api';
import { useRouter } from 'next/router';
import { ProductList } from './product-list';
import { ProductListPagination } from './product-list-pagination';

import { useGetAllBrands } from '@/shared/api/queries/get-all-brands';
import { useGetCategoriesWithoutChildren } from '@/shared/api/queries/get-categories-without-children-api';
import { TypographySmall } from '@/shared/ui/typography';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';

export const AdminProductView = (): JSX.Element => {
	const router = useRouter();

	let page = 1;

	if (!isNaN(Number(router.query.page))) {
		page = Number(router.query.page);
	}

	let brandId: number | undefined = undefined;

	if (!isNaN(Number(router.query.brandId))) {
		brandId = Number(router.query.brandId);
	}

	let categoryId: number | undefined = undefined;

	if (!isNaN(Number(router.query.categoryId))) {
		categoryId = Number(router.query.categoryId);
	}

	const { data } = useGetAdminProductApi(page, categoryId, brandId);

	const { data: brands } = useGetAllBrands();
	const { data: categories } = useGetCategoriesWithoutChildren();

	const changeBrand = (id: number) => {
		if (id > 0) {
			router.push({
				pathname: router.pathname,
				query: { ...router.query, brandId: id.toString(), page: '1' },
			});
		} else {
			delete router.query.brandId;
			router.push({ pathname: router.pathname, query: router.query });
		}
	};

	const changeCategory = (id: number) => {
		if (id > 0) {
			router.push({
				pathname: router.pathname,
				query: { ...router.query, categoryId: id.toString(), page: '1' },
			});
		} else {
			delete router.query.categoryId;
			router.push({ pathname: router.pathname, query: router.query });
		}
	};

	const activeBrand = brands?.find(b => b.id === brandId);
	const activeCategory = categories?.find(c => c.category_id === categoryId);

	const pages = data?.total
		? data.total > 0
			? Math.ceil(data?.total / 8)
			: 1
		: 0;
	return (
		<div className='pb-3'>
			{/* TODO: ADD model searching by article */}
			<TypographySmall className='block my-2'>Бренд</TypographySmall>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='outline' size='sm'>
						{activeBrand ? activeBrand.title : 'Не выбрано'}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className='max-h-[200px] overflow-y-scroll'
					align='start'
				>
					{brands?.map(b => (
						<DropdownMenuItem
							key={b.id}
							className='flex items-center'
							onClick={() => changeBrand(b.id)}
						>
							{activeBrand?.id === b.id && (
								<Icon icon='done_outline_24' className='w-4 h-4 mr-2' />
							)}
							<div>{b.title}</div>
						</DropdownMenuItem>
					))}
					<DropdownMenuItem
						className='flex items-center'
						onClick={() => changeBrand(0)}
					>
						{!activeBrand && (
							<Icon icon='done_outline_24' className='w-4 h-4 mr-2' />
						)}
						<div>Не выбрано</div>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<TypographySmall className='block my-2'>Категория</TypographySmall>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='outline' size='sm'>
						{activeCategory ? activeCategory.title : 'Не выбрано'}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className='max-h-[200px] overflow-y-scroll'
					align='start'
				>
					{categories?.map(c => (
						<DropdownMenuItem
							key={c.category_id}
							className='flex items-center'
							onClick={() => changeCategory(c.category_id)}
						>
							{activeCategory?.category_id === c.category_id && (
								<Icon icon='done_outline_24' className='w-4 h-4 mr-2' />
							)}
							<div>{c.title}</div>
						</DropdownMenuItem>
					))}
					<DropdownMenuItem
						className='flex items-center'
						onClick={() => changeCategory(0)}
					>
						{!activeCategory && (
							<Icon icon='done_outline_24' className='w-4 h-4 mr-2' />
						)}
						<div>Не выбрано</div>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<ProductList products={data?.products || []} />
			<ProductListPagination page={page} pages={pages} className='mt-4' />
		</div>
	);
};
