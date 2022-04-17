<script lang="ts">
	import Button, { Label } from '@smui/button';
	import Dialog, { Title, Content } from '@smui/dialog';
	import IconButton from '@smui/icon-button';
	import Textfield from '@smui/textfield';
	import { loading, resourceStore } from '@modules/stores';
	import { addResource, updateResource, deleteResource, type Resource } from '@modules/resource';

	let resource: Resource;
	let focusRef = null;

	const clearResource = () => {
		resource = {
			id: '',
			title: '',
			description: '',
			url: ''
		};
	};

	const openDialog = async () => {
		$resourceStore.resource ? (resource = $resourceStore.resource) : clearResource();
		focusRef.focus();
	};

	clearResource();
</script>

<Dialog
	bind:open={$resourceStore.opened}
	on:SMUIDialog:opened={openDialog}
	on:SMUIDialog:closed={resourceStore.reset}
>
	<Content>
		<IconButton on:click={resourceStore.reset} class="right-corner material-icons">
			close
		</IconButton>
		<Title>
			{$resourceStore.type === 'add' ? 'Add' : $resourceStore.type === 'edit' ? 'Edit' : 'Delete'} Resource
		</Title>
		<center>
			<form
				on:submit|preventDefault={$resourceStore.type === 'add'
					? addResource
					: $resourceStore.type === 'edit'
					? updateResource
					: deleteResource}
			>
				<input type="hidden" name="id" value={resource.id} />
				<p>
					<Textfield
						style="width: 100%;"
						type="text"
						variant="outlined"
						label="Title"
						input$name="title"
						bind:value={resource.title}
						bind:this={focusRef}
						input$emptyValueUndefined
						disabled={$loading || $resourceStore.type === 'delete'}
					/>
				</p>
				<p>
					<Textfield
						style="width: 100%;"
						type="text"
						variant="outlined"
						label="Description"
						input$name="description"
						bind:value={resource.description}
						input$emptyValueUndefined
						disabled={$loading || $resourceStore.type === 'delete'}
					/>
				</p>
				<p>
					<Textfield
						style="width: 100%;"
						type="text"
						variant="outlined"
						label="Website"
						input$name="url"
						bind:value={resource.url}
						input$emptyValueUndefined
						disabled={$loading || $resourceStore.type === 'delete'}
					/>
				</p>
				<br />
				{#if $resourceStore.type === 'delete'}
					<strong>Are you sure?</strong>
					<p />
				{/if}
				<Button class="dialog-button" type="submit" variant="outlined" disabled={$loading}>
					<Label>
						{$loading ? 'Loading' : $resourceStore.type === 'delete' ? 'Delete' : 'Save'}
					</Label>
				</Button>
				<Button
					type="button"
					on:click={resourceStore.reset}
					class="dialog-button"
					variant="outlined"
					disabled={$loading}
				>
					<Label>Cancel</Label>
				</Button>
			</form>
		</center>
	</Content>
</Dialog>

<style global>
	.right-corner {
		position: absolute;
		top: 0;
		right: 0;
	}
</style>
