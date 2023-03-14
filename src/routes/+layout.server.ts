import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ cookies, locals }) => {
	// throw error(401, 'Not authorized');
	// const token = cookies.get('token');

	const user = locals.user;

	// console.log({ token });

	return { user };
};

export const ssr = true;

// If we set crs to false, the page will not be reactive (and, for example, the navigation will not be client-side-navigation full reload the page)
export const csr = true;

// If trailingSlash === 'always', the route will always be redirected to a www..../ (with a "/" at the end). if === 'never' it will not add trailingSlash. It also rok in routes
export const trailingSlash = 'always';
