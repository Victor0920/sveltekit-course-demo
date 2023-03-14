import type { Handle, HandleFetch, HandleServerError } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

// This handle function will run every time the svelte server receives a request
const handle1: Handle = async ({ event, resolve }) => {
	// event.isDataRequest is to check if it is client navigation or if is requested from the server.

	// populated data with locals will be available in any .server.ts file of the project
	const { locals, cookies, isDataRequest, url } = event;

	if (!url.pathname.startsWith('/api')) {
		const token = cookies.get('token');

		locals.user = token ? { name: 'John', id: 123 } : undefined;
	}

	// if (url.pathname === '/products') {
	// 	return new Response('Custom response');
	// }

	const response = await resolve(event);

	response.headers.set('x-custom-header', 'value');

	return response;
};

// If more than one handle is needed, the sequence will export all of them
// export const handle = sequence(handle1, handle2...);
export const handle = sequence(handle1);

export const handleFetch: HandleFetch = ({request, event, fetch}) => {
	// Handle fetch will "grab" and modify requests to cross-origin endpoints
	if(request.url.startsWith('https://dummyjson.com')) {
		// event will have the information of the page requested (first the page is requested and then the load function is called)
		const cookie = event.request.headers.get('cookie');

		if(cookie) {
			request.headers.set('cookie', cookie)
		}
	}

	return fetch(request);
}

// This function will act as an "unexpected error catcher" for the server. Not when we throw an error with "throw new Error"
// For example in +server if we put fetcch(...) instead of fetch()
export const handleError: HandleServerError = ({error, event}) => {
	console.log('this is coming from handleError',event);
	console.log('error', event); // Send to sentry or any error logging service

	return {
		message: 'An unexpected error exists',
		code: 'Unexpected'
	}
}
