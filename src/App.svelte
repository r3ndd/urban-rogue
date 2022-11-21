<script lang="ts">
	import DescriptionWindow from "./components/DescriptionWindow.svelte";
	import EntityWindow from "./components/EntityWindow.svelte";
	import InventoryWindow from "./components/InventoryWindow.svelte";
	import KeysWindow from "./components/KeysWindow.svelte";
	import LocationBar from "./components/LocationBar.svelte";
	import StatsWindow from "./components/StatsWindow.svelte";

	import UrbanRogue from "./game/UrbanRogue";

	const game = new UrbanRogue();
	game.Engine.AddRenderer(render);

	function render() {}
</script>

<main>
	<div class="left-panel">
		<LocationBar {game} />
		<DescriptionWindow {game} />
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
