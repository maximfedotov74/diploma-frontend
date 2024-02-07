import { ComponentPropsWithRef } from 'react';
import { cn } from '../utils/cn';

export type SVGIconProps = ComponentPropsWithRef<'svg'> & {
	icon: IconType;
};

export const Icon = ({
	className,
	icon,
	...props
}: SVGIconProps): JSX.Element => {
	return (
		<svg
			className={cn('w-4 h-4 fill-current transition-colors', className)}
			{...props}
		>
			<use xlinkHref={`/sprite.svg#${icon}`} />
		</svg>
	);
};
