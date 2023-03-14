import type { PageLoad } from './$types';

export const load: PageLoad = async ({
	data,
	// url,
	// route,
	// params,
	// parent,
	fetch,
	depends
	// setHeaders
}) => {
	// data will return the data obtained from the +page.server.ts

	// Set headers will only have effect then load function is loaded on he server.
	// This headers will be sent for the request of the page is loaded
	// setHeaders({
	// 	age: '100',
	// 	'Cache-Control': 'max-age=604800'
	// });

	fetch('https://dummyjson.com/products');
	fetch('https://dummyjson.com/users');

	// Custom identifier to invalidate if needed
	depends('app:products');

	return {
		products: data.products,
		title: 'Products List'
	};
	// const products = await (await import('$lib/dummy-products.json')).default;
	// console.log('Products load function', products);
	// return { products };
};
