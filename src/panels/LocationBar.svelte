<script lang="ts">
	import type UrbanRogue from "../game/UrbanRogue";
	import type Node from "../engine/world/Node";

	export let game: UrbanRogue;
	let path: string[] = [];

	$: if (game) {
		let node: Node = game.Player.Location;
		path = [];

		do {
			path.push(node.Name);
			node = node.RegionParent;
		} while (node != null);
	}
</script>

<div class="location-bar inverted">
	{#each [...path].reverse() as location, i (location)}
		<div class="location">
			{location}
		</div>
		{#if i != path.length - 1}
			<div class="arrow">></div>
		{/if}
	{/each}
</div>

<style>
	.location-bar {
		display: flex;
		flex-flow: row nowrap;
		align-items: stretch;
		justify-content: flex-start;
	}

	.arrow {
		margin: 0px 3px;
	}
</style>
