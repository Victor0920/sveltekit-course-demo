import adapter from '@sveltejs/adapter-auto'; // adapter-auto supports vercel
// import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			$components: 'src/lib/components'
		},

		// crawl: true and entries: ['*'] are the default values
		prerender: {
			crawl: true,
			entries: ['*']
		}
	}
};

export default config;
