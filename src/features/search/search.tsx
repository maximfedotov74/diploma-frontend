import { Icon } from '@/shared/ui/icon';
import { Input } from '@/shared/ui/input';
import { cn } from '@/shared/utils/cn';
import { useSearchApi } from './search-api';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import Image from 'next/image';
import { TypographySmall } from '@/shared/ui/typography';
import { Link } from '@/shared/ui/link';
import { ModelActionGender } from '@/shared/api/generated';
import { CATALOG_ROUTE, PRODUCT_ROUTE } from '@/shared/constants/routes/public';
import { parsePriceRUB } from '@/shared/utils/parse-price';

export const Search = ({
	className,
	genderMenu,
}: {
	className?: string;
	genderMenu: ModelActionGender;
}): JSX.Element => {
	const { handleSearch, searchTerm, models, open, setOpen } = useSearchApi();

	return (
		<div className={cn(className, 'flex flex-col')}>
			<Input
				type='text'
				className='w-full'
				rightSection={<Icon icon='search_outline_24' className='w-6 h-6' />}
				value={searchTerm}
				onChange={handleSearch}
				onFocus={() => {
					if (models !== undefined) {
						setOpen(true);
					}
				}}
			/>
			<Popover open={open} onOpenChange={setOpen} modal>
				<PopoverTrigger
					className='invisible h-[1px] pointer-events-none touch-none'
					disabled
				>
					open
				</PopoverTrigger>
				<PopoverContent
					align='start'
					side='bottom'
					avoidCollisions={false}
					className={cn('p-3 overflow-y-scroll max-h-[300px]', className)}
					onOpenAutoFocus={e => e.preventDefault()}
				>
					{models && models.length > 0 ? (
						models.map(m => (
							<div key={m.model_id} className='relative mb-2 last:mb-0'>
								<div className='sm:flex'>
									<Image
										width={90}
										height={120}
										className='w-[90px] h-[120px] rounded-md mr-2'
										alt={m.product_title}
										src={m.model_main_image_path}
									/>
									<div className='flex flex-col'>
										<Link
											variant='menu'
											className='mb-1'
											href={`${PRODUCT_ROUTE}/${m.product_slug}`}
										>
											Название: {m.product_title}
										</Link>

										<TypographySmall className='mb-1'>
											Цена: {parsePriceRUB(m.model_price)}
										</TypographySmall>
										<Link
											prefetch={false}
											className='mb-1'
											href={`${CATALOG_ROUTE}/${m.category.slug}`}
											variant='menu'
										>
											Категория: {m.category.title}
										</Link>
										<Link
											href={{
												pathname: `${CATALOG_ROUTE}/${genderMenu}`,
												query: {
													brands: m.brand.id,
												},
											}}
											prefetch={false}
											className='mb-1'
											variant='menu'
										>
											Бренд: {m.brand.title}
										</Link>
									</div>
								</div>
							</div>
						))
					) : (
						<div>Ничего не найдено!</div>
					)}
				</PopoverContent>
			</Popover>
		</div>
	);
};
