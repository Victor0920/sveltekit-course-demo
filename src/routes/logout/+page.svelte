<script>
	import { goto } from '$app/navigation';

	let username = '';
	let password = '';

	const login = async () => {
		const response = await fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify({ username, password })
		});

		const resJson = await response.json();

		if (response.ok) {
			goto('/');
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
