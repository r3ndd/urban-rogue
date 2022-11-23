<script lang="ts">
	import type Game from "../game/UrbanRogue";

	export let game: Game;
	game.Engine.AddRenderer(render);

	function render() {}
</script>

<div class="keys-window" />

<style>
	.keys-window {
		display: flex;
		flex-flow: row wrap;
		align-items: flex-start;
		justify-content: flex-start;
	}
</style>
