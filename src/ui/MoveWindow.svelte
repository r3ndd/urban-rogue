<script lang="ts">
	import ControlItem from "../components/ControlItem.svelte";
	import ControlsList from "../components/ControlsList.svelte";
	import Panel from "../components/Panel.svelte";
	import type UrbanRogue from "../game/UrbanRogue";

	export let game: UrbanRogue;
	let page: number = 0;
	let numPages: number = 0;
	let locations: Record<string, string> = {};
	let controlsData: Record<string, string> = {
		"K/UpArrow": "View Parent Location",
		"J/DownArrow": "View Nested Location",
	};

	$: if (game) {
		page = game.Controls.MovePage;
		numPages = game.Controls.NumMovePages;
		locations = game.Controls.GetControlsData()["locations"];
	}
</script>

<div class="move-window">
	<Panel title="Move">
		<div class="move-wrapper">
			<div class="page-info">
				Page {page} / {numPages}
			</div>
			<div class="locations">
				{#each Object.keys(locations) as key (key)}
					<div class="location">
						<ControlItem {key} desc={locations[key]} />
					</div>
				{/each}
			</div>
			<div class="move-controls">
				<ControlsList {controlsData} />
			</div>
		</div>
	</Panel>
</div>

<style>
	.move-window {
		flex-grow: 1;
		flex-basis: 0%;

		display: flex;
		flex-flow: row nowrap;
		align-items: stretch;
		justify-content: flex-start;

		margin: 0px 5px 10px 5px;
	}

	.move-wrapper {
		display: flex;
		flex-flow: column nowrap;
		align-items: stretch;
		justify-content: flex-start;

		width: 100%;
		height: 100%;
	}

	.page-info,
	.locations {
		margin-left: 10px;
	}

	.page-info {
		margin-top: 10px;
		margin-bottom: 10px;

		font-weight: bold;
	}

	.locations {
		flex-grow: 1;
	}

	.location {
		margin-bottom: 10px;
	}

	.move-controls {
		display: flex;
		flex-flow: row nowrap;
		align-items: stretch;
		justify-content: flex-start;

		padding: 10px;
	}
</style>
