import type Game from "../../Game";
import Entity from "../Entity";
import type Action from "./Action";
import type { GroundNode } from "../../world/Node";

export interface QueuedAction {
	action: Action
	turnsLeft: number
}

export default abstract class Actor extends Entity {
	protected queuedActions: QueuedAction[]

	constructor(game: Game, _location: GroundNode) {
		super(game, _location);

		this.queuedActions = [];
		this.game.Engine.TurnManager.RegisterActor(this);
	}

	Destroy() {
		this.game.Engine.TurnManager.RemoveActor(this);
	}

	async OnTurn() {
		if (this.queuedActions.length > 0) {
			let queuedAction = this.queuedActions[0];
			queuedAction.turnsLeft--;

			if (!queuedAction.action.Condition()) {
				this.queuedActions.shift();
			}
			else if (queuedAction.turnsLeft <= 0) {
				queuedAction.action.Run();
				this.queuedActions.shift();
			}
		}
		else
			await this.PrepareNextAction();
	}

	abstract PrepareNextAction();

	QueueAction(action: Action, turns: number) {
		this.queuedActions.push({
			action,
			turnsLeft: turns,
		});
	}

	get MoveTime(): number {
		return 1;
	}
}