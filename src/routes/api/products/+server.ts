import { error, json, type RequestHandler } from '@sveltejs/kit';

import { API_URL } from '$env/static/private';

export const GET: RequestHandler = async ({ fetch, locals }) => {
	// const products = await (await import('$lib/dummy-products.json')).default;
	const response = await fetch(`${API_URL}/products?limit=6`);

	console.log('/api/products locals', locals);

	if (response.ok) {
		const resJSON = await response.json();

		return json(resJSON, { status: 200 });
	}

	// Errors must be returned with throw error()
	throw error(response.status, response.statusText);
};

// export const POST: RequestHandler = async ({ request }) => {
// 	const product = await request.json();

// 	if (!product.title) {
// 		throw error(400, 'Product title is required');
// 	}

// 	return json({ id: 123, title: product.title });
// };
