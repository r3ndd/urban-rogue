<script lang="ts">
	import EventWindow from "./ui/EventWindow.svelte";
	import EntityWindow from "./ui/EntityWindow.svelte";
	import InventoryWindow from "./ui/InventoryWindow.svelte";
	import ControlsBar from "./ui/ControlsBar.svelte";
	import StatsWindow from "./ui/StatsWindow.svelte";
	import LocationBar from "./ui/LocationBar.svelte";

	import UrbanRogue from "./game/UrbanRogue";
	import ContextWindow from "./ui/ContextWindow.svelte";

	let game = new UrbanRogue();
	game.Engine.AddRenderer(render);
	game.Load();
	game.Start();

	function render(_game: UrbanRogue) {
		game = _game;
	}
</script>

<main>
	<div class="left-panel">
		<LocationBar {game} />
		<EventWindow {game} />
		<ContextWindow {game} />
		<ControlsBar {game} />
	</div>
	<div class="right-panel">
		<StatsWindow {game} />
		<InventoryWindow {game} />
	</div>
</main>

<style>
	main {
		display: flex;
		flex-flow: row nowrap;
		align-items: stretch;
		justify-content: flex-start;

		width: 100%;
		height: 100%;
	}

	.left-panel {
		flex-grow: 1;

		display: flex;
		flex-flow: column;
		align-items: stretch;
		justify-content: flex-start;
	}

	.right-panel {
		display: flex;
		flex-flow: column;
		align-items: stretch;
		justify-content: flex-start;
	}
</style>
