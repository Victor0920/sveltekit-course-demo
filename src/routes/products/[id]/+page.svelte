<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	$: currentProduct = data.currentProduct;

	console.log(data.nested);
</script>

<!-- <svelte:head>
	<title>{currentProduct.title}</title>
	<meta name="description" content={currentProduct.description} />
</svelte:head> -->

<h2>Product</h2>
{#if currentProduct}
	<img src={currentProduct.thumbnail} alt={currentProduct.title} />
	<h3>{currentProduct.title}</h3>
	<p>{currentProduct.description}</p>

	{#await data.nested.comments}
		Loading comments...
	{:then data}
		{#each data.comments as comment}
			<p>{comment.body}</p>
		{/each}
	{/await}
{/if}

<style>
	img {
		width: 100%;
	}
</style>
