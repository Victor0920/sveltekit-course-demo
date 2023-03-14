import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const data = await request.json();

	if (!data.username) {
		throw error(400, 'Name is required!');
	}

	if (!data.password) {
		throw error(400, 'Password is required!');
	}


    cookies.set('token', 'token_value', {
        path: '/', // The path is set like that so that we can use it anywhere in our application
    });
	return json({ name: data.username, id: 123 });
};
