<script lang="ts">
	import type Game from "../engine/Game";

	export let game: Game;
	game.Engine.AddRenderer(render);

	function render(game: Game) {}
</script>

<div class="stats-window" />

<style>
	.stats-window {
		display: flex;
		flex-flow: column;
		align-items: stretch;
		justify-content: flex-start;
	}
</style>
