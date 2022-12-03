<script lang="ts">
	import EventWindow from "./panels/EventWindow.svelte";
	import EntityWindow from "./panels/EntityWindow.svelte";
	import InventoryWindow from "./panels/InventoryWindow.svelte";
	import KeysWindow from "./panels/KeysWindow.svelte";
	import StatsWindow from "./panels/StatsWindow.svelte";
	import LocationBar from "./panels/LocationBar.svelte";

	import UrbanRogue from "./game/UrbanRogue";

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
		<EntityWindow {game} />
		<KeysWindow {game} />
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
