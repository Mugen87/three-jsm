import resolve from 'rollup-plugin-node-resolve';

export default {
	input: 'src/main.js',
	output: [
		{
			format: 'umd',
			name: 'LIB',
			file: 'build/main.js'
		}
	],
	plugins: [ resolve() ]
};
