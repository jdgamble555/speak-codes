<script lang="ts">
	import {
		darkMode,
		loader,
		snackStore,
		toggleDarkMode,
		toggleLogin,
		toggleProfile
	} from '@modules/stores';
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import IconButton from '@smui/icon-button';
	import Dialog_C from '@components/dialogs.svelte';
	import Snackbar_C from '@components/snackbar.svelte';
	import { user, _logout } from '@modules/auth';
	import Button from '@smui/button';

	const logout = () => {
		loader(async () => {
			const { message } = await _logout();
			if (message) snackStore.showMsg(message);
		});
	};
</script>

<svelte:head>
	<meta
		name="description"
		content="Your most relevant coding resources!"
	/>
	<link rel="stylesheet" id="theme" href="/smui{$darkMode ? '-dark' : ''}.css" />
</svelte:head>
<Snackbar_C />
<Dialog_C />
<div class="top-app-bar">
	<TopAppBar variant="fixed">
		<Row>
			<Section>
				<IconButton color="secondary" class="material-icons">
					<div class={$darkMode ? 'icon-color' : ''}>terminal</div>
				</IconButton>
				<Title>Speak.Codes</Title>
			</Section>
			<Section align="end" toolbar>
				<IconButton
					on:click={toggleDarkMode}
					class="material-icons"
					aria-label="{$darkMode ? 'Light' : 'Dark'} Mode"
					title="{$darkMode ? 'Light' : 'Dark'} Mode"
				>
					{$darkMode ? 'brightness_7' : 'brightness_4'}
				</IconButton>
				{#if !$user}
					<Button aria-label="Login" on:click={toggleLogin} title="Login">Login</Button>
				{:else}
					<IconButton
						class="material-icons"
						aria-label="Logout"
						on:click={toggleProfile}
						title="Profile"
					>
						account_box
					</IconButton>
					<Button aria-label="Logout" on:click={logout} title="logout">Logout</Button>
				{/if}
			</Section>
		</Row>
	</TopAppBar>
</div>
<div class="s-container {$darkMode ? 'dark' : 'light'}-theme">
	<slot />
</div>

<style global>
	.s-container {
		max-width: 995px;
		width: 100%;
		background-color: transparent !important;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
	.icon-color {
		color: #4fc3f7;
	}
	.top-app-bar {
		height: 60px;
	}
</style>
