<script lang="ts">
	import Card, { Content } from '@smui/card';
	import Checkbox from '@smui/checkbox';
	import FormField from '@smui/form-field';
</script>

<Card variant="outlined">
	<Content>
		<h1 class="text-center">Levels</h1>
		<ul class="level-list">
			<li>
				<FormField class="card-text" align="end">
					<Checkbox />
					<span slot="label">A1</span>
				</FormField>
			</li>
			<li>
				<FormField class="card-text" align="end">
					<Checkbox />
					<span slot="label">A2</span>
				</FormField>
			</li>
			<li>
				<FormField class="card-text" align="end">
					<Checkbox />
					<span slot="label">B1</span>
				</FormField>
			</li>
			<li>
				<FormField class="card-text" align="end">
					<Checkbox />
					<span slot="label">B2</span>
				</FormField>
			</li>
			<li>
				<FormField class="card-text" align="end">
					<Checkbox />
					<span slot="label">C1</span>
				</FormField>
			</li>
			<li>
				<FormField class="card-text" align="end">
					<Checkbox />
					<span slot="label">C2</span>
				</FormField>
			</li>
		</ul>
	</Content>
</Card>

<style global>
	.level-list {
		list-style: none;
	}
	.level-list > li {
		display: inline-block;
		margin-right: -0.25em;
		letter-spacing: -1em;
	}
	.text-center {
		text-align: center;
	}
</style>
