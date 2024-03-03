module.exports = {
	main: {
		input: './src/shared/api/schema.json',
		output: {
			target: './src/shared/api/generated.ts',

			override: {
				mutator: {
					path: './src/shared/api/api.ts',
					name: 'api',
				},
			},
		},
	},
};
