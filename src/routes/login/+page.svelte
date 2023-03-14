<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import type { Snapshot } from './$types';

	let username = '';
	let password = '';

	export const snapshot: Snapshot<{ username: string; password: string }> = {
		// capture will ran when we navigate out of the page. The return will host our data in the sessionstorage of the browser
		capture: () => {
			return {
				username,
				password
			};
		},
		//restore will be used to restore our data from the sessionstorage
		restore: (value) => {
			username = value.username;
			password = value.password;
		}
	};

	const login = async () => {
		const response = await fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify({ username, password })
		});

		const resJson = await response.json();

		if (response.ok) {
			// The second param is the same as calling await invalidateAll() directly
			// goto('/', { invalidateAll: true });

			// resets all the parameters
			await invalidateAll();
		} else {
			alert(resJson.message);
		}

		console.log({ resJson });
	};
</script>

<form on:submit|preventDefault={login}>
	<label for="username">Username</label><br />
	<input bind:value={username} id="username" name="username" placeholder="Username" />

	<label for="password">Password</label><br />
	<input
		bind:value={password}
		id="password"
		name="password"
		placeholder="Password"
		type="password"
	/>

	<br /><br />
	<button type="submit">Login</button>
</form>
