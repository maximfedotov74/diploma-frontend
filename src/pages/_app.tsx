import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { geist } from '@/config/fonts';
import { cn } from '@/shared/utils/cn';
import { Toaster } from '@/shared/ui/toaster';

export default function App({ Component, pageProps }: AppProps) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						retry: false,
					},
				},
			})
	);
	return (
		<div className={cn(geist.variable, 'font-geist')}>
			<QueryClientProvider client={queryClient}>
				<Component {...pageProps} />
				<Toaster />
			</QueryClientProvider>
		</div>
	);
}
