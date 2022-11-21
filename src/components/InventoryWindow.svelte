<script lang="ts">
	import type Game from "../game/Game";

	export let game: Game;
	game.engine.AddRenderer(render);

	function render() {}
</script>

<div class="inventory-window" />

<style>
	.inventory-window {
		display: flex;
		flex-flow: column;
		align-items: stretch;
		justify-content: flex-start;
	}
</style>
