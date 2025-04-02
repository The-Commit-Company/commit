import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import proxyOptions from './proxyOptions';
import mdx from '@mdx-js/rollup'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), mdx()],
	server: {
		port: 8080,
		proxy: proxyOptions
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
	},
	build: {
		outDir: '../commit/public/docs',
		emptyOutDir: true,
		target: 'es2015',
	},
});
