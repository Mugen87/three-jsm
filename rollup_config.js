import resolve from 'rollup-plugin-node-resolve';

export default {
	input: 'src/main.js',
	output: [
		{
			format: 'umd',
			name: 'APP',
			file: 'build/main.js'
		}
	],
	plugins: [ resolve() ]
};
