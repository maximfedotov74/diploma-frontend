import { InfoOptions } from './product-info-tabs';

export const ProductInfoOptions = ({
	options,
}: {
	options: InfoOptions[];
}): JSX.Element => {
	return (
		<ul className='max-w-lg'>
			{options.map((opt, idx) => (
				<li key={opt.title + idx} className='flex mb-2 last:mb-0'>
					<div className='overflow-hidden flex max-w-[300px]'>
						<div>{opt.title}</div>
						<div className='whitespace-nowrap text-foreground/40'>
							{`            . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .`}
						</div>
					</div>
					<div className='grow'>{opt.values?.map(v => v.value).join(', ')}</div>
				</li>
			))}
		</ul>
	);
};
