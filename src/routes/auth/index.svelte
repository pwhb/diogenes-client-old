<script context="module">
	// @ts-ignore
	export function load({ url }) {
		const type = url.searchParams.get('type');
		return {
			props: {
				type
			}
		};
	}
</script>

<script>
	import supabase from '$lib/supabase/db';

	import { onMount } from 'svelte';

	/**
	 * @type {string}
	 */
	export let type;

	onMount(() => {
		const user = supabase.auth.user();
		console.log('user:', user);
		if (user) {
			location.href = '/home';
		}
	});
	let showPassword = false;
	let error = {
		email: '',
		password: '',
		confirmPassword: '',
		general: ''
	};
	let email = '',
		password = '',
		confirmPassword = '';

	/**
	 * @param {string} email
	 * @param {string} password
	 * @param {string} confirmPassword
	 // * @param {boolean} showPassword
	 */
	async function handleRegister(email, password, confirmPassword, showPassword) {
		const res = await fetch('/auth/create', {
			method: 'POST',
			credentials: 'same-origin',
			body: JSON.stringify({ email, password, confirmPassword, showPassword })
		});
		const data = await res.json();
		return {
			status: res.status,
			data
		};
	}

	/**
	 * @param {string} email
	 * @param {string} password
	 * @param {boolean} showPassword
	 */
	async function handleLogin(email, password, showPassword) {
		const res = await fetch('/auth/login', {
			method: 'POST',
			credentials: 'same-origin',
			body: JSON.stringify({ email, password, showPassword })
		});
		const data = await res.json();
		return {
			status: res.status,
			data
		};
	}

	async function handleAuth() {
		// @ts-ignore
		error = {};

		if (!email || email.length < 4) {
			error.email = 'email must be a valid email';
		}

		if (!password || password.length < 8) {
			error.password = 'password must be at least 8 characters long';
		}

		if (Object.keys(error).length > 0) {
			return;
		}

		const get = await fetch(`/api/profiles/${email}`, {
			method: 'GET',
			credentials: 'same-origin'
		});

		const data = await get.json();
		console.log('data', data);
		// login
		if (type === 'login') {
			if (get.status === 404) {
				error.general = `no profile was created using this email ${email}. please sign up first.`;
				return;
			}
			// const auth = await supabase.auth.signIn({ email, password });
			// console.log('auth', auth);
			// if (auth.error) {
			// 	error.general = auth.error.message;
			// }
		}
		// register
		else {
			if (password !== confirmPassword) {
				error.confirmPassword = 'passwords must match.';
				return;
			}
			if (get.status !== 404) {
				error.general = `a profile was already created using this email ${email}. please sign in.`;
				return;
			}
			// const auth = await supabase.auth.signUp({ email, password });
			// console.log('auth', auth);
			// if (auth.error) {
			// 	error.general = auth.error.message;
			// }
			const post = await fetch('api/profiles', {
				method: 'POST',
				credentials: 'same-origin',
				body: JSON.stringify({ hello: 'world' })
			});
			console.log('post', post);
			const data = await post.json();
			console.log('data', data);
		}
	}
</script>

<div class="flex h-screen items-center">
	<div class="card shadow-xl p-8 md:mx-auto">
		<form class="form-control" on:submit|preventDefault={handleAuth}>
			{#if type === 'login'}
				<p class="text-center text-rose-400 text-2xl font-semibold mb-4">Login to your account</p>
			{:else}
				<p class="text-center text-rose-400 text-2xl font-semibold mb-4">Create your account</p>
			{/if}
			<input
				type="email"
				bind:value={email}
				class={`input bg-rose-50 my-2 ${error.email ? 'input-error' : ''}`}
				placeholder="email"
			/>
			{#if error.email}
				<p class="text-sm text-red-500 text-center">{error.email}</p>
			{/if}
			{#if showPassword}
				<input
					type="text"
					bind:value={password}
					class={`input bg-rose-50 my-2 ${error.password ? 'input-error' : ''}`}
					placeholder="password"
				/>
			{:else}
				<input
					type="password"
					bind:value={password}
					class={`input bg-rose-50 my-2 ${error.password ? 'input-error' : ''}`}
					placeholder="password"
				/>
			{/if}
			{#if error.password}
				<p class="text-sm text-red-500 text-center">{error.password}</p>
			{/if}
			{#if type !== 'login'}
				{#if showPassword}
					<input
						type="text"
						bind:value={confirmPassword}
						class={`input bg-rose-50 my-2 ${error.confirmPassword ? 'input-error' : ''}`}
						placeholder="password again"
					/>
				{:else}
					<input
						type="password"
						bind:value={confirmPassword}
						class={`input bg-rose-50 my-2 ${error.confirmPassword ? 'input-error' : ''}`}
						placeholder="password again"
					/>
				{/if}
				{#if error.confirmPassword}
					<p class="text-sm text-red-500 text-center">{error.confirmPassword}</p>
				{/if}
			{/if}

			<div class="form-control">
				<label class="label cursor-pointer">
					<input
						type="checkbox"
						bind:value={showPassword}
						class="checkbox checkbox-secondary bg-rose-200"
					/>
					<span class="label-text">show password</span>
				</label>
			</div>

			{#if error.general}
				<div class="text-sm text-red-500 text-center max-w-xs">{error.general}</div>
			{/if}
			{#if type === 'login'}
				<button class="btn bg-rose-400 border-0 text-white my-2 shadow-md">Login</button>

				<a href="/auth?type=register" class="btn btn-link text-blue-400"
					>Doesn't have an account? Sign up.</a
				>
			{:else}
				<button class="btn bg-rose-400 border-0 text-white my-2 shadow-md">Register</button>

				<a href="/auth?type=login" class="btn btn-link text-blue-400"
					>Already have an account? Sign in.</a
				>
			{/if}
		</form>
	</div>
</div>
