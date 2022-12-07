<script lang="ts">
	import Panel from "../components/Panel.svelte";
	import Actor from "../engine/entity/actions/Actor";
	import Entity from "../engine/entity/Entity";
	import type { NodeEntity } from "../engine/world/Node";
	import type UrbanRogue from "../game/UrbanRogue";

	export let game: UrbanRogue;
	let animateEntities: string[] = [];
	let inanimateEntities: Record<string, number> = {};

	$: if (game) {
		game.Player.Location.Entities.forEach(
			(num: number, entity: NodeEntity) => {
				let entityName: string;

				if (entity instanceof Actor) {
					entityName = (entity.constructor as typeof Actor).Name;
					animateEntities.push(entityName);
				} else {
					if (entity instanceof Entity) {
						entityName = (entity.constructor as typeof Entity).Name;
						inanimateEntities[entityName] = num;
					} else {
						entityName = (entity as typeof Entity).Name;
						inanimateEntities[entityName] = num;
					}
				}
			}
		);
	}
</script>

<div class="entity-window">
	<Panel title="Entities">
		<div class="all-entities">
			<div class="entity-list-wrapper">
				<div class="title">Animate</div>
				<div class="entities-list">
					{#each animateEntities as entity (entity)}
						<div class="entity">
							{entity}
						</div>
					{/each}
				</div>
			</div>
			<div class="entity-list-wrapper">
				<div class="title">Inanimate</div>
				<div class="entities-list">
					{#each Object.keys(inanimateEntities) as entity (entity)}
						<div class="entity">
							{entity} ({inanimateEntities[entity]})
						</div>
					{/each}
				</div>
			</div>
		</div>
	</Panel>
</div>

<style>
	.entity-window {
		flex-grow: 1;
		flex-basis: 0%;

		display: flex;
		flex-flow: row nowrap;
		align-items: stretch;
		justify-content: flex-start;

		margin: 0px 5px 10px 5px;
	}

	.all-entities {
		display: flex;
		flex-flow: row nowrap;
		align-items: stretch;
		justify-content: flex-start;

		width: 100%;
		height: 100%;
	}

	.entity-list-wrapper {
		margin: 10px;
	}

	.title {
		font-weight: bold;
	}

	.entities-list {
		display: flex;
		flex-flow: column wrap;
		align-items: stretch;
		justify-content: flex-start;
	}
</style>
