<script>
	import supabase from '$lib/supabase/db';

	const user = supabase.auth.user();

	console.log(user);

	async function logout() {
		const res = await supabase.auth.signOut();
		console.log(res);
	}
</script>

<div class="navbar bg-rose-500">
	<div class="flex-1">
		<a class="btn btn-ghost normal-case text-xl text-white" href="/">diogenes</a>
	</div>
	<div class="flex-none">
		<div class="dropdown dropdown-end">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label tabindex="0" class="btn btn-ghost btn-circle avatar">
				<div class="w-10 rounded-full">
					<img src="https://api.lorem.space/image/face?hash=33791" alt="avatar" />
				</div>
			</label>
			<ul
				tabindex="0"
				class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
			>
				<!-- <li> -->
				<!-- 	<a class="justify-between" href="/profile"> -->
				<!-- 		Profile -->
				<!-- 		<span class="badge">New</span> -->
				<!-- 	</a> -->
				<!-- </li> -->
				<li><a href="profile">Profile</a></li>
				<li><a href="setting">Settings</a></li>
				<li><button on:click={logout}>Logout</button></li>
			</ul>
		</div>
	</div>
</div>
