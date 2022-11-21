import Engine from "./Engine";
import type World from "./world/World";

export default abstract class Game {
	public Engine: Engine;
	public World: World;

	constructor() {
		this.Engine = new Engine(this);
	}
}