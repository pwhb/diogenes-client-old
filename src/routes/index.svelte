<script>
	import supabase from '$lib/supabase/db';
	import { onMount } from 'svelte';

	onMount(() => {
		const user = supabase.auth.user();
		if (user) {
			location.href = '/home';
		}
	});
</script>

<div class="flex flex-col min-h-screen gap-8 justify-center items-center">
	<p class="text-rose-400 font-medium text-2xl">Diogenes</p>
	<a
		href="/auth?type=register"
		class="btn shadow-md border-0 bg-rose-400 text-white w-36 rounded-full">Join</a
	>
	<a href="/auth?type=login" class="btn shadow-md border-0 bg-rose-400 text-white w-36 rounded-full"
		>Login</a
	>
</div>
