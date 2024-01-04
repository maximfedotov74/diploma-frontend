import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			fontFamily: {
				'open-sans': ['var(--open-sans-font)'],
			},
			colors: {
				'action-color': 'var(--action-color)',
				'primary-color': 'var(--primary-color)',
				'secondary-color': 'var(--secondary-color)',
				'separator-color': 'var(--separator-color)',
				'tundora-color': 'var(--tundora-color)',
				'mint-color': 'var(--mint-color)',
				'light-gray-color': 'var(--light-gray-color)',
				'blue-20-color': 'var(--blue-20-color)',
				'dark-blue-color': 'var(--dark-blue-color)',
				'loading-grey-color': 'var(--loading-grey-color)',
				'silver-color': 'var(--silver-color)',
			},
		},
	},
	plugins: [],
};
export default config;
