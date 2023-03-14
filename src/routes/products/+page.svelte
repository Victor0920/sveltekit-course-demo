<script lang="ts">
	import { invalidate } from '$app/navigation';
	import type { PageData } from './$types';
	export let data: PageData;

	$: products = data.products.products;
</script>

<h2>Products</h2>
<button
	on:click={() => {
		// As the +page.svelte/load() contains the following url, the function will re-run
		// invalidate('https://dummyjson.com/products');

		//As the load funciton has the following idenifier, it will create the same behavior
		// invalidate('app:products');

		//Also invalidate only if url equals something can be done
		// invalidate((url) => url.hostname === 'dummyjson.com');

		// Also can reload +page.server.ts/load() function
		// invalidate('/api/products');
		invalidate('app:productsServerLoad');
	}}
>
	Re-run load function
</button>

{#if products?.length > 0}
	<ul data-sveltekit-preload-code="viewport">
		{#each products as product}
			<li>
				<img src={product.thumbnail} alt={product.title} />
				<h3>
					<a href="/products/{product.id}"> {product.title}</a>
				</h3>
				<p>{product.description}</p>
			</li>
		{/each}
	</ul>
{/if}

<style>
	ul {
		padding: 0;
		margin: 0;
		list-style: none;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 30px;
	}

	img {
		width: 100%;
	}
</style>
