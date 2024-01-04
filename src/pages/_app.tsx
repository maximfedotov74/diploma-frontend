import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import clsx from 'clsx';
import { openSans } from '@/shared/config/fonts';
import { useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App({ Component, pageProps }: AppProps) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
					},
				},
			})
	);
	return (
		<div className={clsx(openSans.variable, 'font-open-sans')}>
			<QueryClientProvider client={queryClient}>
				<Component {...pageProps} />
			</QueryClientProvider>
		</div>
	);
}
