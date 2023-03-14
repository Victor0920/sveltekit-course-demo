<script lang="ts">
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';

	import { browser, building, dev, version } from '$app/environment';

	console.log({ browser, building, dev, version });
	export let data: LayoutData;

	const logout = async () => {
		const response = await fetch('/api/logout', {
			method: 'POST'
		});

		if (response.ok) {
			invalidateAll();
		}
	};
</script>

<svelte:head>
	<title>Webname {$page.data.title ? ` - ${$page.data.title}` : ''}</title>
	{#if $page.data.description}
		<meta name="description" content={$page.data.description} />
	{/if}
</svelte:head>

<!-- {#if data.user}
	<p>Logged in as {data.user.name}</p>
{/if} -->

<nav style="margin-bottom: 20px;" data-sveltekit-preload-data="hover">
	<a href="/">Home</a>
	<a href="/products">Products</a>

	<!-- {#if !data.user}
		<a href="/login" data-sveltekit-preload-data="off">Login</a>
	{/if}

	{#if data.user}
		<button on:click={logout}> Log out </button>
	{/if} -->
</nav>

<slot />
