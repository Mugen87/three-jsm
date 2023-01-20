import resolve from '@rollup/plugin-node-resolve'; // locate and bundle dependencies in node_modules (mandatory)
import { terser } from "rollup-plugin-terser";
import fs from "fs";

// Copy the AppGLTFLoader_source.js to AppGLTFLoader.js where gltf_content_handler is replaced with the actual gltf data
// So that GLTFLoader.parse can read the content directly
const readFileLines = filename => fs.readFileSync(filename, {encoding:'utf8'}).toString('UTF8');

// The GLTF model as plain text
let gltf_content = readFileLines('./models/planebricked.gltf');

// The source js
let app_source_content = readFileLines('./src/AppGLTFLoader_source.js');

// The final js
let app_content_modified = app_source_content.replace("gltf_content_handler", gltf_content );

// Save it
fs.writeFileSync('./src/AppGLTFLoader.js', app_content_modified);


export default {
	input: 'src/main.js',
	output: [
		{
			format: 'umd',
			name: 'MYAPP',
			file: 'build/bundle.js'
		}
	],
	plugins: [ resolve(), terser() ]
};
