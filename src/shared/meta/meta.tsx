import Head from 'next/head';
import {
	cleanText,
	DEFAULT_DESCRIPTION,
	SITE_NAME,
	titleMerge,
} from '../utils/text-formatting';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

type MetaProps = {
	title: string;
	description?: string;
	image?: string;
	children: ReactNode;
	noIndex?: boolean;
};

export const Meta = ({
	children,
	title,
	description,
	image,
	noIndex = false,
}: MetaProps): JSX.Element => {
	const { asPath } = useRouter();

	const currentUrl = `http://localhost:3000${asPath}`;

	return (
		<>
			<Head>
				<title itemProp='headline'>{titleMerge(title)}</title>

				{noIndex ? (
					<>
						<meta name='robots' content='noindex, nofollow' />
					</>
				) : (
					<>
						<meta
							itemProp='description'
							name='description'
							content={
								description ? cleanText(description, 185) : DEFAULT_DESCRIPTION
							}
						/>
						<link rel='canonical' href={currentUrl} />
						<meta property='og:locale' content='ru' />
						<meta property='og:title' content={titleMerge(title)} />
						<meta property='og:url' content={currentUrl} />
						<meta
							property='og:image'
							content={image || '/android-chrome-192x192.png'}
						/>
						<meta property='og:site_name' content={SITE_NAME} />
						<meta
							name='theme-color'
							media='(prefers-color-scheme: light)'
							content='white'
						/>
						<meta
							name='theme-color'
							media='(prefers-color-scheme: dark)'
							content='black'
						/>
						<meta
							name='msapplication-navbutton-color'
							media=''
							content='#000'
						/>
						<meta
							name='apple-mobile-web-app-status-bar-style'
							media=''
							content='#000'
						/>
						<meta
							property='og:description'
							content={
								description ? cleanText(description, 185) : DEFAULT_DESCRIPTION
							}
						/>
					</>
				)}
			</Head>
			{children}
		</>
	);
};
