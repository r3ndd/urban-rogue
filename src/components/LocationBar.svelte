<script lang="ts">
	import type Game from "../engine/Game";
	import type Node from "../engine/world/Node";

	export let game: Game;
	let path: string[] = [];

	game.Engine.AddRenderer(render);

	function render(game: Game) {
		var node: Node = game.Player.Location;
		path = [];

		do {
			path.push(node.Name);
			node = node.Parent;
		} while (node != null);
	}
</script>

<div class="location-bar">
	{#each [...path].reverse() as location, i (location)}
		<div class="location">
			{location}
		</div>
		{#if i != path.length - 1}
			<div>></div>
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
</style>
