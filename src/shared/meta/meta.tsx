import Head from 'next/head';
import { FC, PropsWithChildren } from 'react';
import { cleanText, SITE_NAME, titleMerge } from '../utils/text-formatting';
import { useRouter } from 'next/router';

type MetaProps = {
	title: string;
	description: string;
	image?: string;
};

export const Meta: FC<PropsWithChildren<MetaProps>> = ({
	children,
	title,
	description,
	image,
}): JSX.Element => {
	const { asPath } = useRouter();

	const currentUrl = `http://localhost:3000${asPath}`;

	return (
		<>
			<Head>
				<title itemProp='headline'>{titleMerge(title)}</title>
				{description ? (
					<>
						<meta
							itemProp='description'
							name='description'
							content={cleanText(description, 152)}
						/>
						<link
							rel='shortcut icon'
							href='/favicons/favicon.ico'
							type='image/x-icon'
						/>
						<link
							rel='apple-touch-icon'
							href='/favicons/apple-touch-icon.png'
						/>
						<link
							rel='apple-touch-icon'
							sizes='57x57'
							href='/favicons/apple-touch-icon-57x57.png'
						/>
						<link
							rel='apple-touch-icon'
							sizes='72x72'
							href='/favicons/apple-touch-icon-72x72.png'
						/>
						<link
							rel='apple-touch-icon'
							sizes='76x76'
							href='/favicons/apple-touch-icon-76x76.png'
						/>
						<link
							rel='apple-touch-icon'
							sizes='114x114'
							href='/favicons/apple-touch-icon-114x114.png'
						/>
						<link
							rel='apple-touch-icon'
							sizes='120x120'
							href='/favicons/apple-touch-icon-120x120.png'
						/>
						<link
							rel='apple-touch-icon'
							sizes='144x144'
							href='/favicons/apple-touch-icon-144x144.png'
						/>
						<link
							rel='apple-touch-icon'
							sizes='152x152'
							href='/favicons/apple-touch-icon-152x152.png'
						/>
						<link
							rel='apple-touch-icon'
							sizes='180x180'
							href='/favicons/apple-touch-icon-180x180.png'
						/>
						<link rel='canonical' href={currentUrl} />
						<meta property='og:locale' content='en' />
						<meta property='og:title' content={titleMerge(title)} />
						<meta property='og:url' content={currentUrl} />
						<meta property='og:image' content={image || ''} />
						<meta property='og:site_name' content={SITE_NAME} />
						<meta name='theme-color' content='#181b1e' />
						<meta name='msapplication-navbutton-color' content='#181b1e' />
						<meta
							name='apple-mobile-web-app-status-bar-style'
							content='#181b1e'
						/>
						<meta
							property='og:description'
							content={cleanText(description, 197)}
						/>
					</>
				) : (
					<meta name='robots' content='noindex, nofollow' />
				)}
			</Head>
			{children}
		</>
	);
};
