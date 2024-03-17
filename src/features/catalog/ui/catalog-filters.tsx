import { ModelCatalogFilters } from '@/shared/api/generated';
import { cn } from '@/shared/utils/cn';
import { PriceFilter } from './price-filter';
import { BrandFilters } from './brand-filters';
import { SizeFilters } from './size-filters';
import { OptionFilter } from './option-filter';
import { DiscountFilter } from './discount-filter';
import { SortFilter } from './sort-filter';
export const CatalogFilters = ({
	catalogFilters,
	className,
}: {
	catalogFilters: ModelCatalogFilters;
	className?: string;
}): JSX.Element => {
	return (
		<div className={cn('flex flex-wrap', className)}>
			<SortFilter />
			<BrandFilters brands={catalogFilters.brands} />
			<SizeFilters sizes={catalogFilters.sizes} />
			{catalogFilters.options.map(opt => (
				<OptionFilter key={opt.option_id} opt={opt} />
			))}
			<PriceFilter price={catalogFilters.price} />
			<DiscountFilter />
		</div>
	);
};
