import type Game from "../Game";
import type { VirtualNode } from "./Node";

export default abstract class World {
	protected root: VirtualNode;

	constructor(protected game: Game) {

	}

	abstract Generate();
}