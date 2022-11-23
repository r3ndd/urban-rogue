import type Actor from "./actions/Actor";

export default class TurnManager {
	private actors: Map<Actor, boolean>;

	constructor() {
		this.actors = new Map<Actor, boolean>();
	}

	RegisterActor(actor: Actor) {
		this.actors.set(actor, true);
	}

	RemoveActor(actor: Actor) {
		this.actors.delete(actor);
	}

	async ProcessTurnRound() {
		for (let actor of this.actors.keys())
			await actor.OnTurn();
	}
}