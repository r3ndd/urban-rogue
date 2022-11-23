import type Player from "../entity/Player";
import type Game from "../Game";
import type { VirtualNode } from "./Node";

export default abstract class World {
	protected root: VirtualNode;
	protected player: Player;

	constructor(protected game: Game) {

	}

	abstract Generate();

	get Player() {
		return this.player;
	}
}