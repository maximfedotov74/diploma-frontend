import localFont from 'next/font/local';

export const geist = localFont({
	src: [
		{
			path: '../../assets/fonts/Geist-Light.woff2',
			style: 'normal',
			weight: '300',
		},
		{
			path: '../../assets/fonts/Geist-Regular.woff2',
			style: 'normal',
			weight: '400',
		},
		{
			path: '../../assets/fonts/Geist-Medium.woff2',
			style: 'normal',
			weight: '500',
		},
		{
			path: '../../assets/fonts/Geist-SemiBold.woff2',
			style: 'normal',
			weight: '600',
		},
		{
			path: '../../assets/fonts/Geist-Bold.woff2',
			style: 'normal',
			weight: '700',
		},
		{
			path: '../../assets/fonts/Geist-Black.woff2',
			style: 'normal',
			weight: '800',
		},
		{
			path: '../../assets/fonts/Geist-UltraBlack.woff2',
			style: 'normal',
			weight: '900',
		},
	],
	variable: '--geist-font',
});
