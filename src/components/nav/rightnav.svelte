<script lang="ts">
	import Button, { Label } from '@smui/button';
	import Card, { Content } from '@smui/card';
	import { resourceStore } from '@modules/stores';
</script>

<Card variant="outlined" padded>
	<Content>
		<div class="text-center">
			<Button color="secondary" class="button-color" on:click={resourceStore.add} variant="raised">
				<Label>Add Resource</Label>
			</Button>
		</div>
	</Content>
</Card>

<style global>
	.text-center {
		text-align: center;
	}
	.button-color {
		/*background-color: #1976d2 !important;*/
		color: white !important;
	}
</style>
