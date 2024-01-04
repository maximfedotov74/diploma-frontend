import { FC, HTMLAttributes, PropsWithChildren } from 'react';

type ContainerProps = HTMLAttributes<HTMLDivElement>;

export const Container: FC<PropsWithChildren<ContainerProps>> = ({
	children,
	...props
}): JSX.Element => {
	return (
		<div
			style={{ maxWidth: 1230, padding: '0 15px', margin: '0 auto' }}
			{...props}
		>
			{children}
		</div>
	);
};
