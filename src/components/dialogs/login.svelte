<script lang="ts">
	import { confirmEmail, snackStore, toggleLogin } from '@modules/stores';
	import Button, { Label } from '@smui/button';
	import { Title, Content } from '@smui/dialog';
	import Dialog from '@smui/dialog';
	import IconButton from '@smui/icon-button';
	import { Separator } from '@smui/list';
	import Textfield from '@smui/textfield';
	import { eventToData, _loginWithGoogle, _loginWithLink, _sendLoginLink } from '@modules/auth';
	import { loading, showLogin } from '@modules/stores';
	import { dev } from '$app/env';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let focusRef = null;

	const login = async (e: SubmitEvent) => {
		const { email }: { email?: string } = eventToData(e);
		if ($confirmEmail) {
			const { status, message } = await _loginWithLink({
				email,
				url: $page.url.searchParams.toString()
			});
			if (status === 'loggedIn') {
				confirmEmail.set(false);
				snackStore.showMsg(message);
				showLogin.set(false);
				goto('/');
			} else if (status === 'expiredLink') {
				snackStore.showMsg(message);
			}
		} else {
			_sendLoginLink({
				email,
				isDev: dev,
				host: $page.url.host
			});
		}
	};

	const loginWithGoogle = async () => {
		const { error, message } = await _loginWithGoogle();
		if (error) {
			snackStore.showMsg(error);
		} else if (message) {
			snackStore.showMsg(message);
			toggleLogin();
		}
	};
</script>

<Dialog
	bind:open={$showLogin}
	on:SMUIDialog:opened={() => {
		focusRef.focus();
	}}
>
	<Title>Passwordless Login</Title>
	<Content>
		<IconButton on:click={toggleLogin} class="right-corner material-icons">close</IconButton>
		<center>
			<form on:submit|preventDefault={login}>
				<p>
					{$confirmEmail
						? 'Confirm your email address below:'
						: 'Sign in via magic link with your email below:'}
				</p>
				<div>
					<Textfield
						type="email"
						variant="outlined"
						label="Email"
						input$name="email"
						input$emptyValueUndefined
						bind:this={focusRef}
						required
					/>
				</div>
				<br />
				<Button type="submit" variant="raised" disabled={$loading}>
					<Label>{$loading ? 'Loading' : $confirmEmail ? 'Login' : 'Send magic link'}</Label>
				</Button>
			</form>
			<br />
			<Separator />
			<br />
			OR
			<br />
			<br />
			<Button style="background-color: red" variant="raised" on:click={loginWithGoogle}>
				Login with Google
			</Button>
		</center>
	</Content>
</Dialog>
