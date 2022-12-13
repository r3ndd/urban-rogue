import type Game from "../Game";
import type { GroundNode } from "../world/Node";
import type Action from "./actions/Action";
import Actor from "./actions/Actor";

export default abstract class Player extends Actor {
	public static readonly Name: string = "You";
	public static readonly Desc: string = "";
	private isTurn: boolean = false;
	private turnRes: Function;

	constructor(game: Game, _location: GroundNode) {
		super(game, _location);
	}

	async OnTurn() {
		this.isTurn = true;
		await super.OnTurn();
	}

	PrepareNextAction() {
		return new Promise((res: Function) => {
			this.turnRes = res;
		});
	}

	QueueAction(action: Action, turns: number) {
		if (this.isTurn) {
			super.QueueAction(action, turns);
			this.isTurn = false;
			this.turnRes();
		}
	}
}