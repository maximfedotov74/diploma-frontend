import Link from 'next/link';
import { AnchorHTMLAttributes, FC } from 'react';
import { SITE_NAME } from '../utils/text-formatting';

type LogoProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export const Logo: FC<LogoProps> = ({ className }): JSX.Element => {
	return (
		<Link
			href='/'
			className={`md:text-3xl text-xl  ${className ? className : ''}`}
		>
			{SITE_NAME}
		</Link>
	);
};
