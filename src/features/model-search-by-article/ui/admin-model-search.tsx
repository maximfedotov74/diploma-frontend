import { Input } from '@/shared/ui/input';
import { useSearchByArticle } from '../api/search-by-article';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import Image from 'next/image';
import { EditModelProduct } from '@/features/admin/product/admin-edit-product/ui/edit-model-product';
import { cn } from '@/shared/utils/cn';
import { Separator } from '@/shared/ui/separator';
import { TypographySmall } from '@/shared/ui/typography';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';

export const AdminModelSearchByArticle = ({
	className,
	actionSection,
	editable = false,
}: {
	className?: string;
	actionSection?: (id: number) => void;
	editable?: boolean;
}): JSX.Element => {
	const { handleSearch, searchTerm, models, open, setOpen } =
		useSearchByArticle();

	return (
		<div className='mb-2'>
			<Input
				placeholder='Введите артикул или название товара'
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
					className={cn('p-3 overflow-y-scroll', className)}
					onOpenAutoFocus={e => e.preventDefault()}
				>
					{models && models.length > 0 ? (
						models.map(m => (
							<div key={m.model_id} className='relative mb-2 last:mb-0'>
								<div className='sm:flex items-center'>
									<Image
										width={90}
										height={90}
										className='w-20 h-20 rounded-md mr-2'
										alt={m.product_title}
										src={m.model_main_image_path}
									/>
									<div className='flex flex-col'>
										<TypographySmall className='mb-1'>
											Название: {m.product_title}
										</TypographySmall>
										<TypographySmall className='mb-1'>
											Артикул: {m.article}
										</TypographySmall>
										<TypographySmall className='mb-1'>
											Цена: {m.model_price}
										</TypographySmall>
										<TypographySmall className='mb-1'>
											Категория: {m.category.title}
										</TypographySmall>
										<TypographySmall className='mb-1'>
											Бренд: {m.brand.title}
										</TypographySmall>
									</div>
									<div className='ml-2 flex flex-col'>
										{editable && (
											<EditModelProduct
												className='h-7 w-7'
												model={{
													article: m.article,
													id: m.model_id,
													image_path: m.model_main_image_path,
													price: m.model_price,
													product_id: m.product_id,
													slug: m.product_slug,
													discount: m.model_discount,
												}}
											/>
										)}
										{actionSection && (
											<Button
												className='w-7 h-7 mt-1'
												variant='ghost'
												size='icon'
												onClick={() => actionSection(m.model_id)}
											>
												<Icon icon='add_outline_24' className='w-5 h-5' />
											</Button>
										)}
									</div>
								</div>
								<Separator />
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
