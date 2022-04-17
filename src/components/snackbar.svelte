<script lang="ts">
	import Snackbar, { Actions, Label } from '@smui/snackbar';
	import IconButton from '@smui/icon-button';
	import { snackStore } from '@modules/stores';
</script>

<Snackbar bind:this={$snackStore.opened}>
	<Label>{$snackStore.msg}</Label>
	<Actions>
		<IconButton class="material-icons" title="Dismiss">close</IconButton>
	</Actions>
</Snackbar>

