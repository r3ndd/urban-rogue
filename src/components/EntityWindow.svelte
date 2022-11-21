<script lang="ts">
	import type Game from "../game/Game";

	export let game: Game;
	game.engine.AddRenderer(render);

	function render() {}
</script>

<div class="entity-window" />

<style>
	.entity-window {
		display: flex;
		flex-flow: row wrap;
		align-items: flex-start;
		justify-content: flex-start;
	}
</style>
