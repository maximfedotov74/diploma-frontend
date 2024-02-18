import { cn } from '../utils/cn';
import { TypographySmall } from './typography';

export const ErrorText = ({
	error,
	className,
}: {
	error?: string;
	className?: string;
}): JSX.Element => {
	return (
		<>
			{error ? (
				<TypographySmall className={cn('text-action', className)}>
					{error}
				</TypographySmall>
			) : null}
		</>
	);
};
