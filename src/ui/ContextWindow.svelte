<script lang="ts">
	import type UrbanRogue from "../game/UrbanRogue";
	import EntityWindow from "./EntityWindow.svelte";
	import MoveWindow from "./MoveWindow.svelte";

	export let game: UrbanRogue;
	let state: string;

	$: if (game) {
		switch (game.Controls.State) {
			case "move":
				state = "move";
				break;
			case "base":
			default:
				state = "base";
				break;
		}
	}
</script>

{#if state == "base"}
	<EntityWindow {game} />
{:else if state == "move"}
	<MoveWindow {game} />
{/if}

<style>
	.context-window {
		display: flex;
		flex-flow: row wrap;
		align-items: flex-start;
		justify-content: flex-start;
	}
</style>
