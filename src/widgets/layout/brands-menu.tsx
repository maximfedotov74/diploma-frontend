import { ModelActionGender, ModelBrand } from '@/shared/api/generated';
import { CATALOG_ROUTE } from '@/shared/constants/routes/public';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { Link } from '@/shared/ui/link';
import { TypographySmall } from '@/shared/ui/typography';
import { useState } from 'react';

export const BrandsMenu = ({
	brands,
	genderMenu,
}: {
	brands: ModelBrand[];
	genderMenu: ModelActionGender;
}): JSX.Element => {
	const [open, setOpen] = useState(false);

	return (
		<div className='pl-2'>
			<div className='flex items-center mb-2'>
				<Button
					variant='link'
					size='sm'
					className='p-0'
					onClick={() => setOpen(p => !p)}
				>
					<TypographySmall>Бренды</TypographySmall>
					<Icon icon='chevron_up_down' className='ml-2' />
				</Button>
			</div>
			{open && (
				<ul className='pl-2'>
					{brands.map(b => (
						<li className='mb-2' key={b.id}>
							<Link
								variant='menu'
								href={{
									pathname: `${CATALOG_ROUTE}/${genderMenu}`,
									query: {
										brands: b.id,
									},
								}}
							>
								{b.title}
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
