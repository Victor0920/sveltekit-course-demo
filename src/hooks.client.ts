import type { HandleClientError } from "@sveltejs/kit";

export const handleError: HandleClientError = ({error, event}) => {
	console.log('this is coming from handleError',event);
	console.log('error', event); // Send to sentry or any error logging service

	return {
		message: 'An unexpected error exists',
		code: 'Unexpected'
	}
}