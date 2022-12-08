<script lang="ts">
	import ControlsList from "../components/ControlsList.svelte";
	import type Game from "../game/UrbanRogue";

	export let game: Game;
	let controlsData: Record<string, string> = {};

	$: if (game) {
		controlsData = game.Controls.GetControlsData()["core"];
	}
</script>

<div class="controls-bar">
	<ControlsList {controlsData} />
</div>

<style>
	.controls-bar {
		display: flex;
		flex-flow: row wrap;
		align-items: flex-start;
		justify-content: flex-start;

		padding: 0px 5px 5px 5px;
	}
</style>
