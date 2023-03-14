import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

// parent will get data from layout
export const load: PageLoad = async ({ parent }) => {
	const {user} = await parent();

    console.log(user);

	if (user) {
		throw redirect(307, '/');
	}
};
