<script>
	import Appbar from '$lib/components/appbar.svelte';
	import supabase from '$lib/supabase/db';
	import { onMount } from 'svelte';
	onMount(() => {
		const user = supabase.auth.user();
		if (!user) {
			location.href = '/';
		}
	});
</script>

<Appbar />
