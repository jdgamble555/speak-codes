<script lang="ts">
	import IconButton, { Icon } from '@smui/icon-button';
	import Card, { ActionIcons, Actions, Content } from '@smui/card';
	import { darkMode, resourcesStore, resourceStore } from '@modules/stores';
	import Button, { Label } from '@smui/button';
	import { Separator } from '@smui/list';
</script>

{#if $resourcesStore?.length}
	{#each $resourcesStore as r}
		<Card variant="outlined" padded class="resource-card">
			<Content>
				<Button
					on:click={() => {}}
					href={r.url}
					target="_blank"
					class={$darkMode ? 'dark-button' : 'light-button'}
				>
					<Label>{r.title}</Label>
				</Button>
				<br />
				<br />
				<Separator color={$darkMode ? 'white' : ''} />
				<br />{r.description}
			</Content>
			<Actions fullBleed>
				<ActionIcons>
					<IconButton
						on:click={() => {}}
						toggle
						aria-label="Add to favorites"
						title="Add to favorites"
					>
						<Icon class="material-icons" on>favorite</Icon>
						<Icon class="material-icons">favorite_border</Icon>
					</IconButton>
					<IconButton class="material-icons" on:click={() => {}} title="Share">share</IconButton>
					<IconButton
						class="material-icons"
						on:click={() => resourceStore.delete(r)}
						title="Delete"
					>
						delete
					</IconButton>
					<IconButton
						class="material-icons"
						on:click={() => resourceStore.edit(r)}
						title="Edit"
					>
						edit
					</IconButton>
					<IconButton class="material-icons" on:click={() => {}} title="More options">
						more_vert
					</IconButton>
				</ActionIcons>
			</Actions>
		</Card>
	{/each}
{/if}

<style global>
	.dark-button {
		/*background-color: #cfd8dc !important;*/
		/*color: #880e4f !important;*/
		background-color: #1976d2;
		color: white !important;
	}

	.light-button {
		background-color: white !important;
		color: #1976d2 !important;
	}

	.mdc-text-field--focused {
		color: white !important;
		caret-color: white !important;
		border-color: #1976d2 !important;
	}

	.resource-card:not(:last-child) {
		margin-bottom: 20px;
	}
</style>
