import type Game from "../Game";
import type { GroundNode } from "../world/Node";
import Actor from "./actions/Actor";

export default abstract class Player extends Actor {
	public readonly Name = "Yourself";
	public readonly Desc = "";

	constructor(game: Game, _location: GroundNode) {
		super(game, _location);

		game.Engine.InputManager.RegisterKeyListener("m", this.handleMoveKey);
		game.Engine.InputManager.RegisterKeyListener("c", this.handleMoveKey);
	}

	async PrepareNextAction() {

	}

	handleMoveKey(event: KeyboardEvent) {

	}

	handleCombatKey(event: KeyboardEvent) {

	}
}