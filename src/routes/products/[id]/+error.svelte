<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1>+error.svelte in the /routes/products/id</h1>
<h2>{$page.status}: {$page.error?.message}</h2>
<h2>{$page.error?.code}</h2>
