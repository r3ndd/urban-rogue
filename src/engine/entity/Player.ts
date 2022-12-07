import type Game from "../Game";
import type { GroundNode } from "../world/Node";
import Actor from "./actions/Actor";

export default abstract class Player extends Actor {
	public static readonly Name = "You";
	public static readonly Desc = "";

	constructor(game: Game, _location: GroundNode) {
		super(game, _location);
	}

	async PrepareNextAction() {

	}
}