import { resolve } from 'path';

import vercel from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),
	kit: {
		adapter: vercel(),
		vite: {
			resolve: {
				alias: {
					'@components': resolve('src/components'),
					'@modules': resolve('src/modules'),
					'@routes': resolve('src/routes'),
					'@home': resolve('src/')
				}
			}
		}
	}
};

export default config;
