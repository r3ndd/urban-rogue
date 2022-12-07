<script lang="ts">
	import type Game from "../game/UrbanRogue";

	export let game: Game;

	let controlsData: Record<string, string> = {};

	$: if (game) {
		controlsData = game.Controls.GetControlsData()["core"];
	}
</script>

<div class="controls-bar">
	{#each Object.keys(controlsData) as key (key)}
		<div class="control">
			<div class="key inverted">
				{key}
			</div>
			:
			<div class="desc">
				{controlsData[key]}
			</div>
		</div>
	{/each}
</div>

<style>
	.controls-bar {
		display: flex;
		flex-flow: row wrap;
		align-items: flex-start;
		justify-content: flex-start;

		padding: 0px 5px 5px 5px;
	}

	.control {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;

		margin-right: 15px;
	}

	.control .key {
		padding: 0px 4px;
	}

	.control .desc {
		margin-left: 5px;
	}
</style>
