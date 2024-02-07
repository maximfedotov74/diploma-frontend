import { TypographySmall } from './typography';

export const ErrorText = ({ error }: { error?: string }): JSX.Element => {
	return (
		<>
			{error ? (
				<TypographySmall className='text-action'>{error}</TypographySmall>
			) : null}
		</>
	);
};
