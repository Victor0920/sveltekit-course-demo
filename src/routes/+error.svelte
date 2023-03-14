<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1>+error.svelte in the /routes</h1>
<h2>{$page.status}: {$page.error?.message}</h2>
<h3>Code: {$page.error?.code}</h3>
