<script lang="ts">
	import type UrbanRogue from "../game/UrbanRogue";
	import Panel from "../components/Panel.svelte";

	export let game: UrbanRogue;
</script>

<div class="event-window">
	<Panel title="Events">
		<div class="events">
			{#each game.Events as event}
				<div class="event">
					{event}
				</div>
			{/each}
		</div>
	</Panel>
</div>

<style>
	.event-window {
		flex-grow: 1;
		flex-basis: 0%;

		display: flex;
		flex-flow: row nowrap;
		align-items: stretch;
		justify-content: flex-start;

		margin: 0px 5px 10px 5px;
	}

	.events {
		display: flex;
		flex-flow: column nowrap;
		align-items: stretch;
		justify-content: flex-start;

		width: 100%;
		height: 100%;
	}
</style>
