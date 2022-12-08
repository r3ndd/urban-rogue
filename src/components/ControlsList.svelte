<script lang="ts">
	import ControlItem from "./ControlItem.svelte";

	export let controlsData: Record<string, string>;
</script>

<div class="controls">
	{#each Object.keys(controlsData) as key (key)}
		<ControlItem {key} desc={controlsData[key]} />
	{/each}
</div>

<style>
	.controls {
		display: flex;
		flex-flow: row wrap;
		align-items: flex-start;
		justify-content: flex-start;

		width: 100%;
		height: 100%;
	}
</style>
