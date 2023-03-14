import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { API_KEY } from '$env/static/private';
import { PUBLIC_KEY } from '$env/static/public';

// The dynamic one is going to ve evaluated at runtime

console.log('$env/static/private from .env', API_KEY);
console.log('$env/static/private from .env', PUBLIC_KEY);

export const load: PageServerLoad = async ({
	// parent,
	// url,
	// route,
	// params,
	fetch,
	depends,
	// cookies,
	// getClientAddress,
	locals
	// platform,
	// setHeaders
}) => {
	depends('app:productsServerLoad');

	console.log('/products load function', locals);

	//This is not going to make a real http request. It is just going to call the function because they are on the same server
	const response = await fetch('/api/products');

	if (response.ok) {
		// await response.json() can be avoided. Svelte will handle the promises atomatically and in parallel
		return { products: response.json() };
	}

	// errorJSON will get the message from the server.ts response instead of the default one from the request
	const errorJSON = await response.json();
	throw error(response.status, errorJSON.message);
};

export const prerender = true;
