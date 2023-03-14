import { error } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

// If something of the parameters changes, the function will re-run
export const load: PageServerLoad = async ({ params, fetch }) => {
	const productResponse = await fetch(`https://dummyjson.com/products/${params.id}`);

	if (!productResponse.ok) {
		throw error(productResponse.status, { message: 'Failed to load product!', code: 'NOT FOUND!' });
	}

	const currentProduct = await productResponse.json();

	const comments = fetch('https://dummyjson.com/comments').then((res) => res.json());

	return {
		currentProduct,
		title: currentProduct.title,
		description: currentProduct.description,

		// If is nested, this will be sent as a promise, so the return will not wait until promise
		// is resolver to return the page. The client will need to await the promise
		// This must be used ONLY on PageServerLoad and the hosting must have data stream activated
		nested: {
			comments
		}

		// // No need to await comments (if it is top-level) because page is rendered on the server
		// comments
	};
};

export const prerender = 'auto';
