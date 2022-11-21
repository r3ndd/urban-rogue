<script lang="ts">
	import type Game from "../engine/Game";

	export let game: Game;
	game.Engine.AddRenderer(render);

	function render(game: Game) {}
</script>

<div class="location-bar" />

<style>
	.location-bar {
		display: flex;
		flex-flow: row nowrap;
		align-items: stretch;
		justify-content: flex-start;
	}
</style>
