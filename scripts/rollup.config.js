import cjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: 'main.js',
  plugins: [
    cjs(),
    nodeResolve(),
    terser()
  ],
	output: {
		file: '../web/public/abimage.js',
		format: 'cjs'
	}
};